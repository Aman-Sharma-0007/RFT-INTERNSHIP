function aggregateErrors(errors) {
  return errors.filter((err) => err !== null);
}

module.exports = { aggregateErrors };