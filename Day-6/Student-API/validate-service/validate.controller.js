const validateStudent = (req, res) => {
  const { studentId, name, age, course } = req.body;

  const missing = [];
  if (!studentId) missing.push('studentId');
  if (!name)      missing.push('name');
  if (!age)       missing.push('age');
  if (!course)    missing.push('course');

  if (missing.length > 0) {
    return res.status(400).json({ valid: false, error: `Missing fields: ${missing.join(', ')}` });
  }

  res.status(200).json({ valid: true });
};

module.exports = { validateStudent };