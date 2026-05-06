const userService = require('../services/user.service');

const getAllUsers = (req, res, next) => {
  try {
    const users = userService.fetchAllUsers();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = (req, res, next) => {
  try {
    const user = userService.fetchUserById(req.params.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById };