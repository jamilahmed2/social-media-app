import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// Fetching Posts From Database
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        // console.log(postMessages);

        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Creating New Post
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post)
    try {
        await newPost.save()
        res.status(200).json(newPost)
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
    res.json({message:"Deleted Successfully"})
}