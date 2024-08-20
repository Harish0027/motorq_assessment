const UserController = require('../Controller/CustomerController');
const express = require('express');
const path = require('path');

const router = express.Router();

router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);
router.post('/getAll', UserController.getAllUsers);

module.exports = router;
