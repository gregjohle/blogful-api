require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const articlesRouter = require("./articles/articles-router");

const app = express();

const morganOption =
  (NODE_ENV === "production" ? "tiny" : "common",
  {
    skip: () => NODE_ENV === "test",
  });
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.use("/api/articles", articlesRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: "Server error" };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
