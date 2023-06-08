const invalidTokenRepository = require("../repositories/IInvalidTokenListRepository");

exports.createToken = async (token) => {
  try {
    await invalidTokenRepository.createInvalidToken(token);

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
