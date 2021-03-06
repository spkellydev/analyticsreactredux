const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

/**
 * User Schema
 */
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
  access: String,
  properties: [
    {
      id: String,
      name: String,
      website: String
    }
  ]
});

// Before the user gets saves, hash the password
userSchema.pre("save", function(next) {
  const user = this;

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);

    // hash the password with the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) next(err);

      // overwrite plaintext password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = (suppliedPw, actualPw, cb) => {
  bcrypt.compare(suppliedPw, actualPw, (err, isMatch) => {
    if (err) cb(err);

    cb(null, isMatch);
  });
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
