const express = require('express');
const router  = express.Router();

const { validate } = require('../services/validationService');
const {
  getAllForms,
  getFormById,
  deleteFormById,
} = require('../db/formRepository');
const { buildFetchSuccess } = require('../utils/responseBuilder');

// POST /api/submit 
router.post('/submit', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is empty.',
      });
    }

    const result = await validate({ name, email, age });
    return res.status(result.status).json(result.body);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: err.message,
    });
  }
});

// GET /api/forms — fetch all saved forms
router.get('/forms', async (req, res) => {
  try {
    const forms = await getAllForms();
    return res.status(200).json(buildFetchSuccess(forms.length, forms));
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch forms.',
      error: err.message,
    });
  }
});

// GET /api/forms/:id — fetch a single form by ID
router.get('/forms/:id', async (req, res) => {
  try {
    const form = await getFormById(req.params.id);
    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found.' });
    }
    return res.status(200).json({ success: true, data: form });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch form.',
      error: err.message,
    });
  }
});

// DELETE /api/forms/:id — delete a form by ID
router.delete('/forms/:id', async (req, res) => {
  try {
    const deleted = await deleteFormById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Form not found.' });
    }
    return res.status(200).json({ success: true, message: 'Form deleted successfully.' });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete form.',
      error: err.message,
    });
  }
});

module.exports = router;