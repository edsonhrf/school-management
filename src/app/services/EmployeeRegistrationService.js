const EmployeeRegistration = require('../models/EmployeeRegistrationModel');

exports.findOne = (filter) => {
  return EmployeeRegistration.findOne(filter);
};

exports.createPerson = async (personData) => {
  const person = new EmployeeRegistration(personData);
  return person.save();
};

exports.getPeople = () => {
  return EmployeeRegistration.find();
};

exports.getPersonById = (id) => {
  return EmployeeRegistration.findById(id);
};

exports.updatePerson = (id, personData) => {
  return EmployeeRegistration.updateOne({ _id: id }, personData);
};

exports.deletePerson = (id) => {
  return EmployeeRegistration.deleteOne({ _id: id });
};
