const Customer = require('../Model/CustomerModel');

const adminController = {
  // Controller for an admin-only route
  helloAdmin: (req, res) => {
    res.status(200).json({
      message: 'Welcome, Admin!',
      success: true,
    });
  },
};

module.exports = adminController;
