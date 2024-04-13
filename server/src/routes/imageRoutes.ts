import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { createSequelizeInstance } from '../utils/models/sequelizeCon';
import { QueryTypes } from 'sequelize';


const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Set storage engine
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'src', 'Uploads'),
    filename: function (req, file, cb) {
        const timestamp = Date.now(); 
        cb(null, `${timestamp}_${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
})

router.post('/api/upload', upload.single('image'), (req, res) => {
        
        if (Error instanceof multer.MulterError) {
            // Multer error (e.g., file size exceeded)
            console.error('Multer error:', Error);
            res.status(400).json({ error: 'File upload failed', details: Error.message });
        } else if (Error instanceof Error) {
            // Other errors
            console.error('Error uploading image:', Error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // Upload successful
            if (req.file) {
                const imagePath = path.join('Uploads', req.file.filename);
                console.log('Image uploaded successfully:', imagePath);
                res.status(200).json({ success: true, imagePath: imagePath });
            } else {
                console.error('Error uploading image: req.file is undefined');
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    });



export default router;