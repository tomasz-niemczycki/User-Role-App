import express from "express";
import { RegisterRoutes } from "./generated/routes.js";
import { readFileSync } from "node:fs";
import swaggerUi from "swagger-ui-express";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Aplikacja działa");
});

RegisterRoutes(app);
const swaggerDocument = JSON.parse(
  readFileSync("src/generated/swagger.json", "utf-8"),
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
