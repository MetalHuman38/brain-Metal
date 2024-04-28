import express, { Request, Response } from 'express';
import { logger } from '../middleware/loggerMiddleware';
import 'dotenv/config';
import NewPostRoutes from './NewPostRoutes';
import postRoutes from './postRoutes';
import likesRoutes from './likesRoutes';
import commentRoutes from './commentRoutes';
import imageRoutes from './imageRoutes';
import authenticateRoutes from './authenticateRoutes';

const router = express.Router();

router.use(authenticateRoutes)

// Use the NewPost router for handling post-related routes
router.use(NewPostRoutes);

// Use the post router for handling post-related routes
router.use(postRoutes);

// Use the likes router for handling likes-related routes
router.use(likesRoutes);

// Use the comment router for handling comment-related routes
router.use(commentRoutes);

// Use Image router for handling image-related routes
router.use(imageRoutes);

router.use(logger);


router.post('/test', (req: Request, res: Response) => {
    res.send('Test route success');
}
);


export default router;