import express, { Request, Response } from 'express';
import { logger } from '../middleware/loggerMiddleware';
import 'dotenv/config';
import NewPostRoutes from './NewPostRoutes';
import postRoutes from './postRoutes';
import likesRoutes from './likesRoutes';
import commentRoutes from './commentRoutes';
import imageRoutes from './imageRoutes';
import authenticateRoutes from './authenticateRoutes';
import cors from 'cors';
import userRoutes from './userRoutes';

const router = express.Router();

router.use(cors());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true')
    next();
  })

router.use(authenticateRoutes)

router.use(userRoutes);

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

// testDatabase 
// router.get('/getAllUserr', async (req: Request, res: Response) => {
//     try {
//         const users = await getUsers();
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error getting users:', error);
//         res.status(500).json({ message: 'Error getting users' });
//     }
// }
// );


export default router;