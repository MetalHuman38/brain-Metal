import express, { Request, Response } from 'express';
import { logger } from '../middleware/loggerMiddleware';
import 'dotenv/config';
import testQueryExecution from '../utils/testDatabase';
import userRouter from './userRoutes';
import authRoutes from './authRoutes';
import postRoutes from './postRoutes';
import likesRoutes from './likesRoutes';
import commentRoutes from './commentRoutes';

const router = express.Router();


router.use(authRoutes);

// Use the user router for handling user-related routes
router.use(userRouter);

// Use the post router for handling post-related routes
router.use(postRoutes);

// Use the likes router for handling likes-related routes
router.use(likesRoutes);

// Use the comment router for handling comment-related routes
router.use(commentRoutes);

// Use the logger middleware for all routes
router.use(logger);


router.get('/Get-User', async (req: Request, res: Response) => {
    try {
        testQueryExecution();
        res.send('Query executed successfully!');
    } catch (error) {
        console.error('Query Error, cant reach database:', error);
        res.status(500).send('Error connecting to the database.');
    }
});

export default router;