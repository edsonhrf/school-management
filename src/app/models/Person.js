const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;