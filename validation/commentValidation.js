const { check } = require('express-validator');

exports.commentValidation = [
    check('content', 'Comment content is required').not().isEmpty(),
];