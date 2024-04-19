import express from 'express';
import authController from '../controllers/authController';
import 'dotenv/config';
import cors from 'cors';

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Define the route for generating JWT tokens (e.g., user login)
router.post('/api/generateToken', (req, res) => {

    // Extract the user ID from the request body
    const { UserID } = req.body;
    
    // Generate a JWT token
    const token = authController.generateToken(UserID);
    
    // Send the token in the response
    res.status(200).json({ token });
});


// Define the route for verifying JWT tokens (e.g., user authentication)
router.post('/api/verifyToken', (req, res) => {
        // Extract the token from the request body
        const { token } = req.body;
        
        // Verify the token
        const decoded = authController.verifyToken(token);
        
        // Send the decoded token in the response
        res.status(200).json({ decoded });
})

// Define the route for refreshing JWT tokens (e.g., user refresh token)
router.post('/api/refreshToken', (req, res) => {
    // Extract the user ID from the request body
    const { UserID } = req.body;
    
    // Refresh the JWT token
    const token = authController.refreshToken(UserID);
    
    // Send the token in the response
    res.status(200).json({ token });
});

// Define the route for clearing JWT tokens (e.g., user logout)
router.post('/api/clearToken', (req, res) => {
    // Clear the JWT token
    authController.clearToken();
    
    // Send a success response
    res.status(200).json({ message: 'Token cleared' });
});

export default router;