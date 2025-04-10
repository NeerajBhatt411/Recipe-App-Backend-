const User = require('../model/user_model');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', // ✅ Hostinger ka SMTP server
  port: 465,                  // ✅ Secure SMTP port (SSL)
  secure: true,               // true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,    // ✅ Hostinger email
    pass: process.env.EMAIL_PASS,   // ✅ Us email ka password (jo tu Hostinger me set karta hai)
  }
});

// ye code otp ko genrate krega 
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};



// This function is for registering user with otp 
register = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: " name Email and password are required"
      });
    }
    // name email and password jo user enter krega usko lera h ham req.body say 
    const { name, email, password } = req.body;

    // check kr rahe h ki khi usser name email and password dale bina toh enter nhi kr ra 
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    // Check  kr rahe ki  user alredy register toh nhi h uska email ke through 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }


    // jo open par otp genrate krne ke liye function bnya tha ukso call krke variable otp mai assign kr diya 
    const otp = generateOTP();

    // otpExpire kab hoga 
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);


    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email,  password: hashedPassword, otp, otpExpiry });
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OTP Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Hello ${name},</h2>
          <p style="font-size: 16px; color: #555;">Thank you for registering with us. Please use the following OTP to verify your email address:</p>
          <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 20px 0;">${otp}</div>
          <p style="color: #888;">Note: This OTP is valid for only 5 minutes.</p>
          <p style="margin-top: 30px;">Regards,<br><strong>Team EduHire</strong></p>
        </div>
      `
    });
    res.status(201).json({ message: 'User registered. Please verify OTP sent to email.', email:user.email });
  }
  catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



// this function is for veriying the user by entring the otp 

const verifyOTP = async (req, res) => {

  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }
    const { email, otp } = req.body;

    if (email == "" || otp == "") {
      return res.status(400).json({
        success: false,
        message: "email and otp are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist "
      });
    }

    if (otp != user.otp) {
      return res.status(400).json({
        success: false,
        message: "invalid otp"
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired"
      });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save(); 
    
    // save the updated user 
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d' // ya '7d' based on use-case
    });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token:token
    });
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }


}



// this function is for resending otp 


const resendOTP = async (req, res) => {

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

   const otp = generateOTP();
   user.otp = otp;
   user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
   await user.save();
   
   await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP Verification - Resend',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #333;">Hello ${user.name},</h2>
        <p style="font-size: 16px; color: #555;">You've requested to resend your OTP. Please use the following OTP to verify your email address:</p>
        <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 20px 0;">${otp}</div>
        <p style="color: #888;">Note: This OTP is valid for only 5 minutes.</p>
        <p style="margin-top: 30px;">Regards,<br><strong>Team EduHire</strong></p>
      </div>
    `
  });
  res.status(201).json({ message: 'OTP resent successfully.' });


  }
  catch (error) {
    res.status(500).json({ message: 'Error resending OTP', error });


  }
}



// this function is for forgetting password 
// controller.js
const forgetPassword = async (req, res) => {

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Password Reset OTP',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Hello ${user.name},</h2>
      <p style="font-size: 16px; color: #555;">You have requested to reset your password. Please use the following OTP to proceed:</p>
      <div style="font-size: 24px; font-weight: bold; color: #FF5722; margin: 20px 0;">${otp}</div>
      <p style="color: #888;">This OTP is valid for only 5 minutes.</p>
      <p style="margin-top: 30px;">If you did not request this, you can safely ignore this email.</p>
      <p style="margin-top: 30px;">Regards,<br><strong>Team EduHire</strong></p>
    </div>
  `
});

  res.status(200).json({ message: "OTP sent to email for password reset" });
};


// in this we will verify the otp and set the new password 

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
  if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP expired' });
  const hashedPassword = await bcrypt.hash(newPassword, 10); 
  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // ya '7d' based on use-case
  });

  res.status(200).json({ message: "Password reset successful", token:token });
};





// login function for user to login 


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Email not verified. Please verify OTP." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // if we want to genrate the jwt token we can genrate here the jwt 

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d' // ya '7d' based on use-case
    });

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
  
 

module.exports = {
  register,
  verifyOTP,
  resendOTP,
  forgetPassword,
  resetPassword,
  login
}