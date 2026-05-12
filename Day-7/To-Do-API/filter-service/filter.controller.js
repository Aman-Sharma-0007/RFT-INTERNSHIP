const Task = require('../shared/task.model');

// GET /tasks?status=completed
// GET /tasks?status=pending
// GET /tasks              (returns all)
const filterTasks = async (req, res, next) => {
  try {
    const { status } = req.query;

    let query = {};
    if (status === 'completed') query.completed = true;
    if (status === 'pending')   query.completed = false;

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      filter: status || 'all',
      count: tasks.length,
      data: tasks,
    });
  } catch (err) { next(err); }
};

module.exports = { filterTasks };