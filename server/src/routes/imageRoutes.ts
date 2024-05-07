import express from 'express';
import { uploadMiddleware, upload as multerUpload } from '../middleware/multexMiddleware';
import cors from 'cors';
import { userMiddleware } from '../middleware/userMiddleware';



const router = express.Router();

// Enable CORS for all routes
router.use(cors());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true')
    next();
  })

const upload = multerUpload.single('image');

router.post('/upload', upload, uploadMiddleware, (req, res) => {
    try{
        res.status(201).send({ message: 'Image uploaded successfully' });
    } catch (err) {
        console.error('Error uploading image from route:', err);
        res.status(500).send({ error: 'Error uploading image from route' });
}
});

export default router;