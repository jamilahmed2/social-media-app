import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import express from 'express';
const router = express.Router();

// Fetching Posts From Database
export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// search post 
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Creating New Post
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Edit Uploaded Post
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    // check whethere the id is valid or not
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Internal Error")

    // if id is valid
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatedPost);
}

// Deleteing a post
export const deletePost = async (req, res) => {
    const { id } = req.params;

    // checking id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Internal Error")

    await PostMessage.findByIdAndRemove(id)
    res.json({ message: "Deleted Successfully" })
}

// like a post
export const likePost = async (req, res) => {
    const { id } = req.params;

    // checking useris authenticated or not
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    // checking id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Internal Error")

    const post = await PostMessage.findById(id);

    // checking if the users id is already in like section or not
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // linke a post
        post.likes.push(req.userId);
    } else {
        // dislike a post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.json(updatedPost);
}

// comment on a post
export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    // finding a post
    const post = await PostMessage.findById(id);
    // commenting
    post.comments.push(value);
    // adding comment to a existing post
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

export default router;