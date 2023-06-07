const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/checkToken');
const generateEnrollmentNumber = require('../middlewares/generateEnrollmentNumber');

const employeeRegistrationController = require('../controllers/EmployeeRegistrationController');

router.post('/', /*checkToken*/ generateEnrollmentNumber, employeeRegistrationController.createPerson);

router.get('/', employeeRegistrationController.getPeople);

router.get('/:id', employeeRegistrationController.getPersonById);

router.put('/:id', employeeRegistrationController.updatePerson);

router.delete('/:id', employeeRegistrationController.deletePerson);

module.exports = router;
