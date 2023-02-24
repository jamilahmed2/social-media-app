import express from 'express';
const router = express.Router();

import { getPosts, getPostsBySearch,createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js';

// all routes are started from /posts in client side

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router