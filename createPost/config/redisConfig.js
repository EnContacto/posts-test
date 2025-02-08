const { createClient } = require("redis");

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

client.on("error", (err) => console.error("Redis error:", err));

(async () => {
  await client.connect(); // 🔥 Se requiere en Redis v4+
  console.log("Connected to Redis");
})();

module.exports = client;
