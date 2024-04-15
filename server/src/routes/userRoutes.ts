import express from 'express';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../controllers/userController';
import cors from 'cors';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Define the route for user registration
router.post('/api/register', registerUser);

// Define the route for user login with JWT authentication middleware
router.post('/api/login', loginUser);

// Define the route for getting the current user with JWT authentication middleware
router.get('/api/getCurrentUser', authenticate, getCurrentUser)

// Define the route for user logout with JWT authentication middleware
router.post('/api/logoutUser', authenticate, logoutUser);

export default router;