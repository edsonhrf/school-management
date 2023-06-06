const EmployeeRegistration = require("../models/EmployeeRegistrationModel");

async function generateRegistrationNumber(req, res, next) {
  try {
    const currentYear = new Date().getFullYear();
    const count = await EmployeeRegistration.countDocuments();
    const registrationNumber = `${currentYear}${String(count + 1).padStart(5, '0')}`;
    req.registrationNumber = registrationNumber;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = generateRegistrationNumber;
