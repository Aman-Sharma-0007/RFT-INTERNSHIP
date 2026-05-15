require("dotenv").config();
const express = require("express");
const notesRoutes = require("./routes/notes.routes");

const app = express();
app.use(express.json());

app.use("/notes", notesRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "Notes Service Running" }));

const PORT = process.env.PORT || 2001;
app.listen(PORT, () => {
  console.log(`Notes Service running on port ${PORT}`);
});