require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const NOTES_URL = process.env.NOTES_SERVICE_URL;

// Forward all /notes requests to notes-service
app.use("/notes", async (req, res) => {
  try {
    const url = `${NOTES_URL}/notes${req.path}`;

    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      params: req.query,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      res.status(500).json({ success: false, message: "Gateway Error: " + err.message });
    }
  }
});

// Health check
app.get("/health", (req, res) => res.json({ status: "Gateway Running" }));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});