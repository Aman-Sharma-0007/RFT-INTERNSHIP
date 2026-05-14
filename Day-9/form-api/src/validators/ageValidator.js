function validateAge(age) {
  const ageNum = Number(age);
  if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
    return 'Age must be a number between 5 and 100.';
  }
  return null;
}

module.exports = { validateAge };