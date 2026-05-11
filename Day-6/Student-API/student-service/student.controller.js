const Student = require('./student.model');

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id });
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { studentId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ studentId: req.params.id });
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.status(200).json({ success: true, message: 'Deleted', data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };