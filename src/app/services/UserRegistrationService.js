const UserRegistration = require('../models/UserRegistrationModel');

exports.createUser = async (userData) => {
  const user = new UserRegistration(userData);
  return user.save();
};

exports.getUsers = () => {
  return UserRegistration.find();
};

exports.getUserById = (id) => {
  return UserRegistration.findById(id);
};

exports.updateUser = (id, userData) => {
  return UserRegistration.updateOne({ _id: id }, userData);
};

exports.deleteUser = (id) => {
  return UserRegistration.deleteOne({ _id: id });
};
