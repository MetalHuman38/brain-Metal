import express from 'express';
import cors from 'cors';
import { getRecentPosts, getPostById, updatePostById } from '../controllers/postController';

// Create a new router
const router = express.Router();

router.use(cors());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true')
    next();
  })
// Get Recent Posts
router.get('/getRecentPosts', getRecentPosts);

router.get('/getPostById', getPostById)

// Update post by ID
router.put('/updatePostById', updatePostById);


export default router;