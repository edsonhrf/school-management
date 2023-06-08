const jwt = require("jsonwebtoken");
const InvalidTokenList = require("../models/InvalidTokenListModel");

async function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }

  try {
    const secret = process.env.SECRET;

    const isInvalidTokenListed = await InvalidTokenList.exists({ token });
    if (isInvalidTokenListed) {
      return res.status(401).json({ message: "Invalid token!" });
    }

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token!" });
  }
}

module.exports = checkToken;
