import express from 'express';
import cors from 'cors';
import { getRecentPosts, getPostById, updatePostById } from '../controllers/postController';



// Create a new router
const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Get post by ID
router.get('/getPosts', getPostById);

// Get Recent Posts
router.get('/getRecentPosts', getRecentPosts);

// Update post by ID
router.put('/api/updatePostById', updatePostById);


export default router;