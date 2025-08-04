const { Pool } = require('pg');
module.exports = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'agent_cache',
  user: 'agent_user',
  password: 'AgentPass123',
});
