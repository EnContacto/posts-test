const { createClient } = require("redis");

const redisPort = parseInt(process.env.REDIS_PORT, 10) || 6379; // 🔥 Validar número y asignar 6379 si está vacío

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: redisPort
  }
});

client.on("error", (err) => console.error("Redis error:", err));

(async () => {
  await client.connect();
  console.log("Connected to Redis on port:", redisPort);
})();

module.exports = client;
