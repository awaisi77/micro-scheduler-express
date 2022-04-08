const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//Body Parser Middleware - Should be defined before defining routes
app.use(
  bodyParser.json({
    limit: "400000000",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const scheduler = require("./routes/api/scheduler");
app.use("/api/v1", scheduler);

module.exports = app;
