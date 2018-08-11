const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const localOptions = {
  usernameField: "email"
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  //verify username and password
  User.findOne({ email: email }, (err, user) => {
    if (err) done(err);
    if (!user) done(null, false);

    // compare password, UserSchema method
    try {
      user.comparePassword(password, user.password, (err, isMatch) => {
        if (err) done(err);
        if (!isMatch) done(null, false);

        return done(null, user);
      });
    } catch (err) {
      done(err, false);
    }
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // check if the user ID and the payload exists
  User.findById(payload.sub, (err, user) => {
    if (err) done(err, false);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
