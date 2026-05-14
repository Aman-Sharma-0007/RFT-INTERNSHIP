function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return 'Email must be a valid format (e.g. user@example.com).';
  }
  return null;
}

module.exports = { validateEmail };