const Task = require('../shared/task.model');
const { AppError } = require('../shared/errorHandler');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (err) { next(err); }
};

const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) throw new AppError('Title is required', 400);
    const task = await Task.create({ title });
    res.status(201).json({ success: true, message: 'Task created', data: task });
  } catch (err) { next(err); }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) throw new AppError(`Task ${req.params.id} not found`, 404);
    res.status(200).json({ success: true, message: 'Task deleted', data: task });
  } catch (err) { next(err); }
};

module.exports = { getAllTasks, createTask, deleteTask };