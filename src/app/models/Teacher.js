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
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
