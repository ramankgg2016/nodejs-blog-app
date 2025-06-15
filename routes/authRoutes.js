const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../validation/authValidation');
const upload = require('../middleware/uploadMiddleware'); // For profile image upload

router.post('/signup', upload.single('profileImage'), signupValidation, signupUser);

router.post('/login', loginValidation, loginUser);

module.exports = router;