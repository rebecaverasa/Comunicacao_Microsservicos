import express from "express";

import { connect } from "./src/config/db/mongoDbConfig.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

connect();

app.get("/api/status", (req, res) => {
  return res.status(200).json({
    service: "Sales-API",
    status: "up",
    httpStatus: 200,
  });
});

app.listen(PORT, () => {
  console.info(`Server started successfully at port ${PORT}`);
});
