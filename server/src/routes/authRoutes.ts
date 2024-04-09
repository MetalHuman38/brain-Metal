import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

// Define the route for generating JWT tokens (e.g., user login)
router.post('/api/generateToken', authController.generateToken);

// Define the route for verifying JWT tokens (e.g., user authentication)
router.post('/api/verifyToken', authController.verifyToken);

export default router;