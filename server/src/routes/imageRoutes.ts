import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import Users from '../utils/models/UserModel';

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


router.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        if (req.file) {
            // Upload successful
            const imagePath = path.join('Uploads', req.file.filename);
            console.log('Image uploaded successfully:', imagePath);
            res.status(200).json({ success: true, imagePath: imagePath });

            // Generate the image URL
            const imageURL = `http://localhost:3000/${imagePath}`;

            // Update the user's image URL in the database
            await Users.update({ ImageURL: imageURL }, {
                where: { UserID: req.body.UserID } // Assuming you have the user ID in req.user
            });

            // Send a response
            res.status(200).json({ success: true, imageURL: imageURL });

        } else {
            // No file was uploaded
            console.error('No file uploaded');
            res.status(400).json({ error: 'No file uploaded' });
        }
    } catch (err) {
        // Error handling
        console.error('Error uploading image:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;