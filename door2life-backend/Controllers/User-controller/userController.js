const User = require("../../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ Error: "Server Error" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    // Find user by email
    const user = await User.find();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, phone } = req.body;

  try {
    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    if (password) user.password = password; // Just assign, let pre('save') handle hashing

    // Save user (called only once)
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        updatedUser: updatedUser,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(id);
    // Delete the user
    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const doorStatus = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }

    res.status(200).json({ doorStatus: user.doorStatus });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ Error: "Server Error" });
  }
};

module.exports = {
  getUserById,
  deleteUser,
  updateUser,
  getAllUsers,
  doorStatus,
};
