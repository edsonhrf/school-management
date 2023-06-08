const InvalidTokenListService = require("../services/InvalidTokenListService");

exports.registerInvalidToken = async (req, res) => {
  try {
    const { token } = req.body;

    await InvalidTokenListService.createToken(token);

    res.status(200).json({ message: "Token registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
