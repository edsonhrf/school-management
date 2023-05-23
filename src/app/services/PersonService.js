const Person = require('../models/Person');

// create
exports.createPerson = async (personData) => {
  const person = new Person(personData);
  return person.save();
};

// read
exports.getPeople = () => {
  return Person.find();
};

// read by id
exports.getPersonById = (id) => {
  return Person.findById(id);
};

// update all object
exports.updatePerson = (id, personData) => {
  return Person.updateOne({ _id: id }, personData);
};

// delete
exports.deletePerson = (id) => {
  return Person.deleteOne({ _id: id });
};
