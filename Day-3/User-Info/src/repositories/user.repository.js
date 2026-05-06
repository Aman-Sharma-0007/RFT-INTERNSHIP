
const users = [
  { id: 1, name: "AMIT" },
  { id: 2, name: "RIYA" }
];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};

module.exports = { getAllUsers, getUserById };