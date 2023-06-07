const EmployeeRegistration = require("../models/EmployeeRegistrationModel");

async function generateEnrollmentNumber(req, res, next) {
  try {
    const currentYear = new Date().getFullYear();
    const count = await EmployeeRegistration.countDocuments();
    const enrollmentNumber = `${currentYear}${String(count + 1).padStart(5, '0')}`;
    req.enrollmentNumber = enrollmentNumber;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = generateEnrollmentNumber;
