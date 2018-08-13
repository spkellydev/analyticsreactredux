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
const { decodeUser } = require("./lib/jwt");
const commentRouter = require("./routes/comments");

class User {}
User.token = {};
const user = new User();

commentRouter(app);

/**
 * Named routes for Express must be declared before the React application
 */
app.get("/token", (req, res) => {
  if (user.token) {
    res.json(user);
  } else {
    res.json({ error: "Trouble processing token" });
  }
});

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

app.post("/ga/user", async (req, res) => {
  let token = req.body.token;
  const user = await decodeUser(token);
  console.log(user);
  res.json(user);
});

app.get("/oauth", (req, res) => {
  const code = req.query.code;

  token(code, token => {
    user.token = token;
    res.send(
      "<script>setTimeout(function() {window.close(); }, 550)</script><h1>Logging you in...</h1>"
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
