const Student = require('../models/Student');

//login
exports.findOne = (filter) => {
  return Student.findOne(filter);
};

// create
exports.createStudent = async (studentData) => {
  const student = new Student(studentData);
  return student.save();
};

// read
exports.getStudents = () => {
  return Student.find().select("-password");
};

// read by id
exports.getStudentById = (id) => {
  return Student.findById(id).select("-password");
};

// update all object
exports.updateStudent = (id, studentData) => {
  return Student.updateOne({ _id: id }, studentData);
};

// delete
exports.deleteStudent = (id) => {
  return Student.deleteOne({ _id: id });
};
