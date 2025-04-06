const express = require('express');
const router = express.Router();


const {
    register,
    verifyOTP,
    resendOTP ,
    forgetPassword,
    resetPassword,
    login,
} = require('../controller/user_controller');

// user routes 
router.post('/register', register);          
router.post('/verify-otp', verifyOTP);
router.post("/resend-otp",resendOTP )   
router.post("/forget-password",forgetPassword)   
router.post("/resetPassword",resetPassword)  
router.post("/login",login)     


module.exports = router;
