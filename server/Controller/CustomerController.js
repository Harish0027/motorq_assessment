const Customer = require('../Model/CustomerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new customer
      const newCustomer = new Customer({
        name,
        email,
        password: hashedPassword,
      });

      await newCustomer.save();

      res.status(201).json({
        message: 'Customer registered successfully',
        success: true,
      });
    } catch (error) {
      console.error('Error during sign up:', error);
      res.status(500).json({
        message: 'Internal error',
        error: error.message,
        success: false,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the customer by email
      const customer = await Customer.findOne({ email });

      if (!customer) {
        return res.status(400).json({
          message: 'User not found',
          success: false,
        });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, customer.password);

      if (!isMatch) {
        return res.status(400).json({
          message: 'Invalid credentials',
          success: false,
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { customerId: customer._id, role: customer.role },
        process.env.SECRET_KEY || 'helloMotorQ',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        success: true,
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({
        message: 'Internal error',
        error: error.message,
        success: false,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      // Retrieve all users from the database
      const users = await Customer.find();

      res.status(200).json({
        message: 'Users retrieved successfully',
        success: true,
        users,
      });
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({
        message: 'Internal error',
        error: error.message,
        success: false,
      });
    }
  },
};

module.exports = UserController;
