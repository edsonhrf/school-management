const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
  },
  grade: {
    type: Number,
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

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
