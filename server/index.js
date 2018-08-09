const express = require("express");
const path = require("path");
const getData = require("./lib/analytics");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, "../public"))); // serves the index.html

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Rquested-With, Content-Type, Accept"
  );
  next();
});

/**
 * Named routes for Express must be declared before the React application
 */

app.get("/ga", (req, res) => {
  // TODO -- implement caching strategy
  getData().then(ga => {
    res.json(ga.data);
  });
});

/**
 * Serve the React application
 * Use the wildcard so that routes defer to the React application
 */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

/**
 * Serve the application
 */

/* eslint-disable no-console */
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

module.exports = app;
