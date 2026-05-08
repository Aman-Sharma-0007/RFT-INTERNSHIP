let users = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'developer' },
  { id: 2, name: 'Priya Singh',  email: 'priya@example.com', role: 'designer'  }
];

const userService = {
  getAllUsers: () => {
    return { error: false, count: users.length, users };
  },

  getUserById: (id) => {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return { error: true, status: 404, message: 'User not found' };
    return { error: false, user };
  },

  createUser: (name, email, role) => {
    if (!name || !email) {
      return { error: true, status: 400, message: 'name and email are required' };
    }
    const newUser = { id: users.length + 1, name, email, role: role || 'intern' };
    users.push(newUser);
    return { error: false, status: 201, message: 'User created!', user: newUser };
  },

  deleteUser: (id) => {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return { error: true, status: 404, message: 'User not found' };
    const deleted = users.splice(index, 1);
    return { error: false, message: 'User deleted', user: deleted[0] };
  }
};

module.exports = userService;