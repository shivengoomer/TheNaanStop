const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// @route   GET /users
// @desc    Get all users
// @access  Admin
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from results
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /users/:id
// @desc    Get a user by ID
// @access  Admin
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /users
// @desc    Create a new user
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, password, avatar, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const user = new User({
      name,
      email,
      password: hashedPassword,
      avatar,
      role,
    });

    const newUser = await user.save();
    res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /users/:id
// @desc    Update a user by ID
// @access  Admin
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password, avatar, role } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password: hashedPassword || undefined, // Update password only if provided
        avatar,
        role,
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /users/:id
// @desc    Delete a user by ID
// @access  Admin
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /users/login
// @desc    Login a user
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
