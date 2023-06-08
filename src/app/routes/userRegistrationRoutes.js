const express = require("express");
const router = express.Router();
const checkToken = require("../middlewares/checkToken");

const userRegistrationController = require("../controllers/UserRegistrationController");

router.post("/", userRegistrationController.createUser);

router.get("/", checkToken, userRegistrationController.getUsers);

router.get("/:id", checkToken, userRegistrationController.getUserById);

router.put("/:id", checkToken, userRegistrationController.updateUser);

router.delete("/:id", checkToken, userRegistrationController.deleteUser);

router.post("/auth/login", userRegistrationController.userLogin);

router.post("/auth/logout", checkToken, userRegistrationController.userLogout);

module.exports = router;
