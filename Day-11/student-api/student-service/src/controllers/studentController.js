const Student = require('../models/studentModel');

// ADD student
exports.addStudent = async (req, res) => {
  try {
    const { name, email, age, course } = req.body;

    if (!name || !email || !age || !course) {
      return res.status(400).json({ error: 'Missing required fields: name, email, age, course' });
    }

    const student = await Student.create({ name, email, age, course });
    res.status(201).json({ message: 'Student created', data: student });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

// GET all students with PAGINATION
exports.getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Student.countDocuments();
    const students = await Student.find().skip(skip).limit(limit);

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalStudents: total,
      data: students,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ data: student });
  } catch (err) {
    // Invalid MongoDB ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid student ID format' });
    }
    res.status(500).json({ error: err.message });
  }
};

// UPDATE student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated', data: student });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid student ID format' });
    }
    res.status(500).json({ error: err.message });
  }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid student ID format' });
    }
    res.status(500).json({ error: err.message });
  }
};