import express from 'express';
import authController from '../controllers/authController';
import 'dotenv/config';
import cors from 'cors';

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Define the route for generating JWT tokens (e.g., user login)
router.post('/api/generateToken', authController.generateToken);

// Define the route for verifying JWT tokens (e.g., user authentication)
router.post('/api/verifyToken', authController.verifyToken);

// Define the route for refreshing JWT tokens (e.g., user refresh token)
router.post('/api/refreshToken', authController.refreshToken);

// Define the route for clearing JWT tokens (e.g., user logout)
router.post('/api/clearToken', authController.clearToken);

export default router;