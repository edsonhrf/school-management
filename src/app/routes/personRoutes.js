const express = require('express');
const router = express.Router();

const personController = require('../controllers/PersonController');

// create
router.post('/', personController.createPerson);

// read
router.get('/', personController.getPeople);

// read by id
router.get('/:id', personController.getPersonById);

// update all object
router.put('/:id', personController.updatePerson);

// delete
router.delete('/:id', personController.deletePerson);

module.exports = router;
