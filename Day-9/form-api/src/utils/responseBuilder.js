function buildSuccess(data) {
  return {
    success: true,
    message: 'Form submitted successfully!',
    data,
  };
}

function buildError(errors) {
  return {
    success: false,
    message: 'Validation failed.',
    errors,
  };
}

function buildFetchSuccess(count, data) {
  return {
    success: true,
    count,
    data,
  };
}

module.exports = { buildSuccess, buildError, buildFetchSuccess };