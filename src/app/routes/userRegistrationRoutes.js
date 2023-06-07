const express = require('express');
const router = express.Router();

const userRegistrationController = require('../controllers/UserRegistrationController');

router.post('/', userRegistrationController.createUser);

router.get('/', userRegistrationController.getUsers);

router.get('/:id', userRegistrationController.getUserById);

router.put('/:id', userRegistrationController.updateUser);

router.delete('/:id', userRegistrationController.deleteUser);

module.exports = router;
