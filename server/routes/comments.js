const AuthController = require("../controllers/AuthController");
const passportService = require("../services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.post("/signin", requireSignIn, AuthController.signin);
  app.post("/signup", AuthController.signup);
};
