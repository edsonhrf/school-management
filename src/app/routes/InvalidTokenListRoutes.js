const express = require("express");
const router = express.Router();
const invalidTokenController = require("../controllers/InvalidTokenListController");

router.post("/auth/invalid/token", invalidTokenController.registerInvalidToken);

module.exports = router;
