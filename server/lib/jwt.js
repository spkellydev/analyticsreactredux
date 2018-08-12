const atob = require("atob");
const AuthController = require("../controllers/AuthController");

exports.decodeUser = async token => {
  let decoded = atob(token);
  decoded = decoded.substring(
    decoded.lastIndexOf("{"),
    1 + decoded.lastIndexOf("}")
  );

  decoded = JSON.parse(decoded);

  console.log(decoded);

  let user = await AuthController.findOne({ id: decoded.sub });
  console.log(user);
  return user;
};
