const jwt = require('jsonwebtoken');

// Middleware to check for JWT token and verify it
const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({
      message: 'Token not provided',
      success: false,
    });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY || 'helloMotorQ', (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid token',
        success: false,
      });
    }

    // Attach the decoded user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
