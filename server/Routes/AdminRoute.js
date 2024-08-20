const express = require('express');
const router = express.Router();
const adminController = require('../Controller/AdminController');
const adminMiddleware = require('../middlewares/Authentication/IsAdmin');
const isUserAuthenticated = require('../middleware/Authentication/Authentication');

// Define a route that requires admin access
router.get(
  '/admin-only-route',
  isUserAuthenticated,
  adminMiddleware,
  adminController.helloAdmin
);

module.exports = router;
