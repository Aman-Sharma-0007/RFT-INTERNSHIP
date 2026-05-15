// In-memory store
let notes = [];
let nextId = 1;

const getAllNotes = (sortBy) => {
  let result = [...notes];
  if (sortBy === "title") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "id") {
    result.sort((a, b) => a.id - b.id);
  }
  return result;
};

const searchNotes = (keyword) => {
  const kw = keyword.toLowerCase();
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(kw) ||
      n.content.toLowerCase().includes(kw)
  );
};

const addNote = ({ title, content }) => {
  if (!title || !content) {
    throw new Error("Title and content are required");
  }
  const note = { id: nextId++, title, content };
  notes.push(note);
  return note;
};

const updateNote = (id, { title, content }) => {
  const note = notes.find((n) => n.id === parseInt(id));
  if (!note) throw new Error("Note not found");
  if (!title && !content) throw new Error("Provide title or content to update");
  if (title) note.title = title;
  if (content) note.content = content;
  return note;
};

const deleteNote = (id) => {
  const index = notes.findIndex((n) => n.id === parseInt(id));
  if (index === -1) throw new Error("Note not found");
  const deleted = notes.splice(index, 1);
  return deleted[0];
};

module.exports = { getAllNotes, searchNotes, addNote, updateNote, deleteNote };