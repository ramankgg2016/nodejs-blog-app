const { check } = require('express-validator');

exports.blogValidation = [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),

];