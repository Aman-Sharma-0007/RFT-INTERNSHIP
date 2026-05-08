const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// GET all users
router.get('/', (req, res) => {
  const result = userService.getAllUsers();
  res.json({ status: 'success', ...result });
});

// GET single user
router.get('/:id', (req, res) => {
  const result = userService.getUserById(req.params.id);
  if (result.error) return res.status(result.status).json({ status: 'error', message: result.message });
  res.json({ status: 'success', ...result });
});

// POST create user
router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  const result = userService.createUser(name, email, role);
  if (result.error) return res.status(result.status).json({ status: 'error', message: result.message });
  res.status(201).json({ status: 'success', ...result });
});

// DELETE user
router.delete('/:id', (req, res) => {
  const result = userService.deleteUser(req.params.id);
  if (result.error) return res.status(result.status).json({ status: 'error', message: result.message });
  res.json({ status: 'success', ...result });
});

module.exports = router;