const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(
  "mongodb://localhost:27017/auth",
  { useNewUrlParser: true }
);

/**
 * Middlewares
 */
// cors
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Rquested-With, Content-Type, Accept"
  );
  next();
});

// static middleware to serve the index.html
app.use(express.static(path.join(__dirname, "../public")));
// request logger middleware
app.use(morgan("combined"));
// parse incoming request middleware
app.use(bodyParser.json({ type: "*/*" }));

// function to access google analytics -- TODO -- move to external routes
const { getData, url, token } = require("./lib/analytics");
const commentRouter = require("./routes/comments");

commentRouter(app);

/**
 * Named routes for Express must be declared before the React application
 */

app.post("/ga", (req, res) => {
  const options = req.body.options;
  // TODO -- implement caching strategy
  getData(options).then(ga => {
    res.json(ga.data);
  });
});

app.get("/ga/cb", (req, res) => {
  res.send(url);
});

app.get("/oauth", (req, res) => {
  console.log("==================");
  const code = req.query.code;
  token(code, status => {
    console.log(status);
    res.send(
      "<script>setTimeout(function() {window.close(); }, 350)</script><h1>Logging you in...</h1>"
    );
  });
});

/**
 * Serve the React application
 * Use the wildcard so that unknown routes defer to the React application
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
