const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/createuser', userController.createuser);
module.exports = router;