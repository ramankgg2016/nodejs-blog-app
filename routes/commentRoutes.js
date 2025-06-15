const express = require('express');
const router = express.Router();
const { addComment, getCommentsForBlog } = require('../controllers/commentController');
const { commentValidation } = require('../validation/commentValidation');
const { protect } = require('../middleware/authMiddleware');


router.post('/:blogId', protect, commentValidation, addComment);

router.get('/:blogId', getCommentsForBlog);

module.exports = router;