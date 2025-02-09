const express = require("express");
const app = express();
const updateRoutes = require("./routes/postRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

app.use(express.json());
app.use("/api", postRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`UpdatePost service running on port ${PORT}`));
