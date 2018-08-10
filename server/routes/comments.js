const AuthController = require("../controllers/AuthController");
module.exports = function(app) {
  app.post("/signup", AuthController.signup);
};
