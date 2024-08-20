const Customer = require('../Model/CustomerModel'); // Update the path if needed

const adminMiddleware = async (req, res, next) => {
  try {
    // Extract customer ID from the authenticated user data
    const { customerId } = req.user;

    if (!customerId) {
      return res.status(400).json({
        message: 'Customer ID is required',
        success: false,
      });
    }

    // Find the customer in the database
    const customer = await Customer.findOne({ customerId });

    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found',
        success: false,
      });
    }

    // Check if the user is an admin
    if (customer.role !== 'admin') {
      return res.status(403).json({
        message: 'User is not an admin',
        success: false,
      });
    }

    // If everything is okay, proceed to the next middleware
    next();
  } catch (error) {
    console.error('Error in admin middleware:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
      success: false,
    });
  }
};

module.exports = adminMiddleware;
