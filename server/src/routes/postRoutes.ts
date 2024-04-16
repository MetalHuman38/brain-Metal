import express from 'express';
import cors from 'cors';
import { getRecentPosts, getPostById, updatePostById } from '../controllers/postController';


const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Get Recent Posts
router.get('/api/getRecentPosts', getRecentPosts);


// Get post by ID
router.get('/api/getPostById', getPostById);

// Update post by ID
router.put('/api/updatePostById', updatePostById);


export default router;