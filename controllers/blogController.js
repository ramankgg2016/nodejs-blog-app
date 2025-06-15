const { validationResult } = require('express-validator');
const Blog = require('../model/Blog');

exports.createBlog = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const image = req.file ? `/images/${req.file.filename}` : null;

    if (!image) {
        return res.status(400).json({ message: 'Blog image is required' });
    }

    try {
        const newBlog = new Blog({
            title,
            image,
            description,
            author: req.user.id, // User ID from JWT
        });

        const blog = await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'email profileImage'); // Populate author details
        res.status(200).json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'email profileImage');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.updateBlog = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const image = req.file ? `/images/${req.file.filename}` : req.body.currentImage; // Keep existing if no new upload

    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.image = image || blog.image;

        await blog.save();
        res.status(200).json({ message: 'Blog updated successfully', blog });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await Blog.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Blog removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};