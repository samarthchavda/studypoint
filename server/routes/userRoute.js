const express=require('express');
const { signup, login, changePassword, sendOTP } = require('../controllers/auth');
const {auth}=require('../middlewares/auth');
const { contactUs } = require('../controllers/contactUs');
const { resetPasswordToken, resetPassword } = require('../controllers/resetPassword');
const router=express.Router();  
router.post("/signUp",signup);
router.post("/login",login);
router.put("/changePassword",auth,changePassword);
router.post('/sendotp',sendOTP);
router.post('/contactUs',contactUs);
router.post('/resetPasswordToken',resetPasswordToken);
router.post('/resetPassword',resetPassword);

module.exports=router;