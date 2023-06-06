const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/checkToken');
const generateRegistrationNumber = require('../middlewares/generateRegistrationNumber');

const employeeRegistrationController = require('../controllers/EmployeeRegistrationController');

// create
router.post('/', checkToken, generateRegistrationNumber, employeeRegistrationController.createPerson);

// read
router.get('/', employeeRegistrationController.getPeople);

// read by id
router.get('/:id', employeeRegistrationController.getPersonById);

// update all object
router.put('/:id', employeeRegistrationController.updatePerson);

// delete
router.delete('/:id', employeeRegistrationController.deletePerson);

module.exports = router;
