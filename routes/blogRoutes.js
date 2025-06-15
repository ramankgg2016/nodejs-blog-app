const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const { blogValidation } = require('../validation/blogValidation');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // For blog image upload


router.post('/', protect, upload.single('blogImage'), blogValidation, createBlog);


router.get('/', getBlogs);


router.get('/:id', getBlogById);

router.put('/:id', protect, upload.single('blogImage'), blogValidation, updateBlog);


router.delete('/:id', protect, deleteBlog);

module.exports = router;