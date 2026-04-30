// TEMPORARY TEST CONTROLLER - For testing without email
// This creates a pre-verified admin user

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Create a test admin user (already verified)
exports.createTestAdmin = async (req, res) => {
  try {
    // Check if test admin already exists
    let user = await User.findOne({ email: 'admin@test.com' });
    
    if (user) {
      return res.status(200).json({
        success: true,
        message: 'Test admin already exists',
        credentials: {
          email: 'admin@test.com',
          password: 'admin123'
        }
      });
    }

    // Create test admin
    user = await User.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'admin',
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      message: 'Test admin created successfully',
      credentials: {
        email: 'admin@test.com',
        password: 'admin123'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a test regular user (already verified)
exports.createTestUser = async (req, res) => {
  try {
    // Check if test user already exists
    let user = await User.findOne({ email: 'user@test.com' });
    
    if (user) {
      return res.status(200).json({
        success: true,
        message: 'Test user already exists',
        credentials: {
          email: 'user@test.com',
          password: 'user123'
        }
      });
    }

    // Create test user
    user = await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'user123',
      role: 'user',
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      message: 'Test user created successfully',
      credentials: {
        email: 'user@test.com',
        password: 'user123'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
