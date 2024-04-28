import express from 'express';
import { uploadMiddleware, upload as multerUpload } from '../middleware/multexMiddleware';
import cors from 'cors';



const router = express.Router();

// Enable CORS for all routes
router.use(cors());

const upload = multerUpload.single('image');

router.post('/api/upload', upload, uploadMiddleware, (req, res) => {
    try{
        res.status(201).send({ message: 'Image uploaded successfully' });
    } catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).send({ error: 'Error uploading image' });
}
});

export default router;