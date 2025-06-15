const { validationResult } = require('express-validator');
const Comment = require('../model/Comment');
const Blog = require('../model/Blog'); // To check if blog exists

// Add a comment to a blog post
exports.addComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { blogId } = req.params;
    const { content, parentCommentId } = req.body;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const newComment = new Comment({
            blog: blogId,
            user: req.user.id,
            content,
            parentComment: parentCommentId || null,
        });

        const comment = await newComment.save();
        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getCommentsForBlog = async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId })
            .populate('user', 'email profileImage')
            .populate('parentComment')
            .sort({ createdAt: 1 });

        res.status(200).json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};