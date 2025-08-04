const { createClient } = require('redis');
const redisClient = createClient();
redisClient.connect().catch(console.error);
redisClient.on('connect', () => console.log('Redis connected'));
module.exports = redisClient;
