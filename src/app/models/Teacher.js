const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  // Other specific fields from teachers
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
