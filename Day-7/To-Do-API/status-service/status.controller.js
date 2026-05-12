const Task = require('../shared/task.model');
const { AppError } = require('../shared/errorHandler');


const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
      throw new AppError("'completed' must be true or false", 400);
    }

    // findByIdAndUpdate with { new: true } returns the updated doc
    // { completed } means only that field is updated — partial update
    const task = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true, runValidators: true }
    );

    if (!task) throw new AppError(`Task ${id} not found`, 404);

    res.status(200).json({
      success: true,
      message: `Task marked as ${completed ? 'completed' : 'pending'}`,
      data: task,
    });
  } catch (err) { next(err); }
};

module.exports = { updateStatus };