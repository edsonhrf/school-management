const Teacher = require('../models/TeacherModel');

//login
exports.findOne = (filter) => {
  return Teacher.findOne(filter);
};

// create
exports.createTeacher = async (teacherData) => {
  const teacher = new Teacher(teacherData);
  return teacher.save();
};

// read
exports.getTeachers = () => {
  return Teacher.find().select("-password");
};

// read by id
exports.getTeacherById = (id) => {
  return Teacher.findById(id).select("-password");
};

// update all object
exports.updateTeacher = (id, teacherData) => {
  return Teacher.updateOne({ _id: id }, teacherData);
};

// delete
exports.deleteTeacher = (id) => {
  return Teacher.deleteOne({ _id: id });
};
