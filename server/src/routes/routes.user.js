const express = require('express');
const router = express.Router();

const UserController = require('../controllers/controllers.user');

// get all users
router.get('/allusers/', UserController.getUsersList);

// create new user
router.post('/', UserController.createNewUser);

module.exports = router;