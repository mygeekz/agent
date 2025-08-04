const express = require('express');
const router = express.Router();
const redisClient = require('../services/redisClient');
const pgPool = require('../services/pgClient');
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getEmbedding(text) {
  const { data } = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return data[0].embedding;
}

router.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    // Layer 1 – Redis exact match
    const redisKey = `chat:${message}`;
    let cached = null;
    try {
      cached = await redisClient.get(redisKey);
      if (cached) return res.json({ reply: cached, source: 'redis-cache' });
    } catch (redisError) {
      console.error('Redis GET error:', redisError.message);
      // Proceed as cache miss
    }

    // Layer 2 – pgvector semantic search
    const embedding = await getEmbedding(message);
    try {
      const { rows } = await pgPool.query(
        `SELECT answer, 1 - (embedding <=> $1) sim
         FROM chat_embeddings
         WHERE 1 - (embedding <=> $1) > 0.8
         ORDER BY sim DESC LIMIT 1`,
        [embedding],
      );
      if (rows.length) {
        const answer = rows[0].answer;
        try {
          await redisClient.setEx(redisKey, 604800, answer); // 7 days
        } catch (redisSetError) {
          console.error('Redis SETEX error:', redisSetError.message);
        }
        return res.json({ reply: answer, source: 'pgvector-cache' });
      }
    } catch (pgError) {
      console.error('pgvector SELECT error:', pgError.message);
      // Proceed as cache miss
    }

    // Layer 3 – OpenAI Agent Mode
    const gpt = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
    });
    const answer = gpt.choices[0].message.content;

    // Persist to caches (best effort)
    try {
      await pgPool.query(
        'INSERT INTO chat_embeddings (question, answer, embedding) VALUES ($1,$2,$3)',
        [message, answer, embedding],
      );
    } catch (pgInsertError) {
      console.error('pgvector INSERT error:', pgInsertError.message);
    }
    try {
      await redisClient.setEx(redisKey, 604800, answer);
    } catch (redisSetError) {
      console.error('Redis SETEX error on new answer:', redisSetError.message);
    }

    res.json({ reply: answer, source: 'openai-api' });
  } catch (e) {
    console.error('General chat error:', e);
    // Handle cases like OpenAI API failure
    if (e.response) {
        console.error(e.response.status, e.response.data);
        return res.status(e.response.status).json(e.response.data);
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
