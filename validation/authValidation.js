
const { check } = require('express-validator');

exports.signupValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
];

exports.loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
];