const { searchUsers } = require("./users.service");

const searchUsersController = async (req, res) => {
  try {
    const { name, email, role } = req.query;

    if (!name && !email && !role) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one filter: name, email, role",
      });
    }

    const results = await searchUsers({ name, email, role });

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      count:   results.length,
      data:    results,
    });

  } catch (error) {
    console.error("Users controller error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { searchUsersController };