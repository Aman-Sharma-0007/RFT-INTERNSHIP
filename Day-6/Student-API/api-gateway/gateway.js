const express  = require('express');
const axios    = require('axios');

const app = express();
app.use(express.json());

const STUDENT  = `http://localhost:${process.env.STUDENT_PORT  || 6001}`;
const VALIDATE = `http://localhost:${process.env.VALIDATE_PORT || 6002}`;
const IDGUARD  = `http://localhost:${process.env.IDGUARD_PORT  || 6003}`;

// POST — chain: validate → idguard → student
app.post('/students', async (req, res) => {
  try {
    const v = await axios.post(`${VALIDATE}/validate`, req.body);
    if (!v.data.valid) return res.status(400).json(v.data);

    const g = await axios.post(`${IDGUARD}/check-id`, req.body);
    if (!g.data.allowed) return res.status(409).json(g.data);

    const s = await axios.post(`${STUDENT}/students`, req.body);
    res.status(201).json(s.data);

  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Gateway error' });
  }
});

// GET / PUT / DELETE — direct to student-service
async function pipe(res, promise) {
  try {
    const r = await promise;
    res.status(r.status).json(r.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Not found' });
  }
}

app.get('/students',        (req, res) => pipe(res, axios.get(`${STUDENT}/students`)));
app.get('/students/:id',    (req, res) => pipe(res, axios.get(`${STUDENT}/students/${req.params.id}`)));
app.put('/students/:id',    (req, res) => pipe(res, axios.put(`${STUDENT}/students/${req.params.id}`, req.body)));
app.delete('/students/:id', (req, res) => pipe(res, axios.delete(`${STUDENT}/students/${req.params.id}`)));

module.exports = app;