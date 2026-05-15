const notesService = require("../services/notes.service");

const getAllNotes = (req, res) => {
  try {
    const { sortBy, search } = req.query;
    if (search) {
      const results = notesService.searchNotes(search);
      return res.json({ success: true, data: results });
    }
    const notes = notesService.getAllNotes(sortBy);
    res.json({ success: true, data: notes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addNote = (req, res) => {
  try {
    const note = notesService.addNote(req.body);
    res.status(201).json({ success: true, data: note });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateNote = (req, res) => {
  try {
    const note = notesService.updateNote(req.params.id, req.body);
    res.json({ success: true, data: note });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const deleteNote = (req, res) => {
  try {
    const note = notesService.deleteNote(req.params.id);
    res.json({ success: true, message: "Note deleted", data: note });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

module.exports = { getAllNotes, addNote, updateNote, deleteNote };