const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const STUDENT_SERVICE = process.env.STUDENT_SERVICE_URL || 'http://localhost:5001';

// Helper to forward requests using axios
const forward = (method, path) => async (req, res) => {
  try {
    const url = `${STUDENT_SERVICE}${path(req)}`;

    const response = await axios({
      method,
      url,
      data: req.body,
      params: req.query,   // forwards ?page=1&limit=5
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    // Forward the error from the downstream service
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(503).json({ error: 'Student service unavailable' });
  }
};

// Routes — gateway mirrors the student service
app.post(  '/api/students',     forward('post',   ()     => '/students'));
app.get(   '/api/students',     forward('get',    ()     => '/students'));
app.get(   '/api/students/:id', forward('get',    (req)  => `/students/${req.params.id}`));
app.put(   '/api/students/:id', forward('put',    (req)  => `/students/${req.params.id}`));
app.delete('/api/students/:id', forward('delete', (req)  => `/students/${req.params.id}`));

// Gateway health
app.get('/health', (req, res) => res.json({ status: 'api-gateway running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));