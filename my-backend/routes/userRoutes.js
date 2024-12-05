const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// POST route for user registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password, // In production, remember to hash the password!
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;
