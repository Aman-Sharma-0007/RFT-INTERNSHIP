const mongoose = require('mongoose');

const IdRecord = mongoose.model('Student',
  new mongoose.Schema({ studentId: { type: String, unique: true } })
);

const checkId = async (req, res) => {
  try {
    const exists = await IdRecord.findOne({ studentId: req.body.studentId });
    if (exists) {
      return res.status(409).json({
        allowed: false,
        error: `Student ID "${req.body.studentId}" already exists`,
      });
    }
    res.status(200).json({ allowed: true });
  } catch (err) {
    res.status(500).json({ allowed: false, error: 'ID check failed' });
  }
};

module.exports = { checkId };