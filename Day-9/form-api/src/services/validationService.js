const { validateName }    = require('../validators/nameValidator');
const { validateEmail }   = require('../validators/emailValidator');
const { validateAge }     = require('../validators/ageValidator');
const { aggregateErrors } = require('../aggregator/errorAggregator');
const { buildSuccess, buildError } = require('../utils/responseBuilder');
const { saveForm }        = require('../db/formRepository');

async function validate({ name, email, age }) {
  // Step 1: Run all validators at once (defensive programming)
  const errors = aggregateErrors([
    validateName(name),
    validateEmail(email),
    validateAge(age),
  ]);

  // Step 2: Return all errors together if any exist
  if (errors.length > 0) {
    return { status: 400, body: buildError(errors) };
  }

  // Step 3: Validation passed — save to MongoDB
  const saved = await saveForm({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    age: Number(age),
  });

  return { status: 201, body: buildSuccess(saved) };
}

module.exports = { validate };