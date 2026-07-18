const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

// Phone OTP
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// Forgot / Reset Password
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:token', resetPassword);

module.exports = router;
