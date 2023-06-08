const InvalidTokenList = require("../models/InvalidTokenListModel");

exports.createInvalidToken = async (token) => {
  try {
    const existingToken = await InvalidTokenList.findOne({ token });

    if (existingToken) {
      throw new Error("Token already exists in the invalid token list.");
    }

    const invalidToken = new InvalidTokenList({ token });
    return invalidToken.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
