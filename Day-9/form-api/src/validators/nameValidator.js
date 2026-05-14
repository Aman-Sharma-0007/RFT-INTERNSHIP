function validateName(name) {
  if (!name || name.trim() === '') {
    return 'Name is required and cannot be empty.';
  }
  return null;
}

module.exports = { validateName };