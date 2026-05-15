const express = require("express");
const router = express.Router();
const controller = require("../controllers/notes.controller");

router.get("/", controller.getAllNotes);       // GET all + search + sort
router.post("/", controller.addNote);          // ADD note
router.put("/:id", controller.updateNote);     // UPDATE note
router.delete("/:id", controller.deleteNote);  // DELETE note

module.exports = router;