const userRepository = require('../repositories/user.repository');

const fetchAllUsers = () => {
  return userRepository.getAllUsers();
};

const fetchUserById = (id) => {
  const user = userRepository.getUserById(id);

  if (!user) {
    // Bonus: throw error if user not found
    const error = new Error(`User with ID ${id} not found`);
    error.status = 404;
    throw error;
  }

  return user;
};

module.exports = { fetchAllUsers, fetchUserById };