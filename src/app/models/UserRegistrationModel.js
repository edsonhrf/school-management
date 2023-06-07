const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    enrollmentNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    collection: "user_registration",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
