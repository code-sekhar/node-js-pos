const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/createuser', userController.createuser);
router.post('/loginuser', userController.loginUser);
//user delete with jwt token
router.delete('/userdelete/:id',userController.authenticateUser ,userController.userDelete);
//user logout with jwt token
router.post('/userlogout',userController.authenticateUser,userController.userLogout);
module.exports = router;