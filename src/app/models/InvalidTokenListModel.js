const mongoose = require("mongoose");

const invalidTokenListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      expires: Date.now() + 24 * 60 * 60,
    },
  },
  {
    collection: "invalid_token_list",
  }
);

const InvalidTokenList = mongoose.model(
  "InvalidTokenList",
  invalidTokenListSchema
);

module.exports = InvalidTokenList;
