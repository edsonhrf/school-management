const express = require("express");
const router = express.Router();
const checkToken = require("../middlewares/checkToken");
const generateEnrollmentNumber = require("../middlewares/generateEnrollmentNumber");

const employeeRegistrationController = require("../controllers/EmployeeRegistrationController");

router.post(
  "/",
  checkToken,
  generateEnrollmentNumber,
  employeeRegistrationController.createPerson
);

router.get("/", checkToken, employeeRegistrationController.getPeople);

router.get("/:id", checkToken, employeeRegistrationController.getPersonById);

router.put("/:id", checkToken, employeeRegistrationController.updatePerson);

router.delete("/:id", checkToken, employeeRegistrationController.deletePerson);

module.exports = router;
