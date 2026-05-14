const Form = require('../models/formModel');

async function saveForm(data) {
  const form = new Form(data);
  return await form.save();
}

async function getAllForms() {
  return await Form.find().sort({ createdAt: -1 });
}

async function getFormById(id) {
  return await Form.findById(id);
}

async function deleteFormById(id) {
  return await Form.findByIdAndDelete(id);
}

module.exports = { saveForm, getAllForms, getFormById, deleteFormById };