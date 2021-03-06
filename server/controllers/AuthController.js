const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

/**
 * Generate JWT token
 * @param {object} user
 * @required user.id
 */
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // user has been authenticated, needs JWT
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    // unprocessable entity
    return res.status(422).send({
      error: "Minimum requirements not met."
    });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) next(err);

    if (existingUser) {
      return res.status(422).send({
        error: "Email is in use"
      });
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save(err => {
      if (err) next(err);
    });

    res.json({ token: tokenForUser(user) });
  });
};

exports.oauth = (userdata, cb) => {
  const email = userdata.email;
  if (!email) {
    // unprocessable entity
    return res.status(422).send({
      error: "Something unforunate has happened."
    });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) next(err);

    if (existingUser) {
      cb({ token: existingUser.access });
    }

    const user = new User(userdata);

    user.save(err => {
      if (err) next(err);
    });

    cb({ token: tokenForUser(user) });
  });
};

exports.findOne = obj => {
  return User.findById(obj.id, (err, user) => {
    if (err) next(err);
    return user;
  });
};
