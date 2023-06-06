const EmployeeRegistration = require('../models/EmployeeRegistrationModel');

//login
exports.findOne = (filter) => {
  return EmployeeRegistration.findOne(filter);
};

// create
exports.createPerson = async (personData) => {
  const person = new EmployeeRegistration(personData);
  return person.save();
};

// read
exports.getPeople = () => {
  return EmployeeRegistration.find();
};

// read by id
exports.getPersonById = (id) => {
  return EmployeeRegistration.findById(id);
};

// update all object
exports.updatePerson = (id, personData) => {
  return EmployeeRegistration.updateOne({ _id: id }, personData);
};

// delete
exports.deletePerson = (id) => {
  return EmployeeRegistration.deleteOne({ _id: id });
};
