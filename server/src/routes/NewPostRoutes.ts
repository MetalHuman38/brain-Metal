import express from 'express';
import cors from 'cors';
import { createPost } from '../controllers/NewPostController';


const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Create a new post
router.post('/createPost', createPost);

export default router;