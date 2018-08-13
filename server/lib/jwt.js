const atob = require("atob");
const AuthController = require("../controllers/AuthController");

exports.decodeUser = async token => {
  try {
    let decoded = atob(token);
    console.log(decoded);
    decoded = decoded.match(/{\"sub":\"[0-9a-zA-z]*\"\,\"iat\"\:[0-9]*\}/);

    console.log(decoded[0]);
    decoded = JSON.parse(decoded[0]);

    let user = await AuthController.findOne({ id: decoded.sub });
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
};
