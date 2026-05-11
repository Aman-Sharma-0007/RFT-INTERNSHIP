const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true, trim: true },
    name:      { type: String, required: true, trim: true },
    age:       { type: Number, required: true, min: 1 },
    course:    { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);