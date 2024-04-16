"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
<<<<<<< HEAD
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
const router = express_1.default.Router();
// Set storage engine
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '..', '..', 'Uploads'),
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        cb(null, `${timestamp}_${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
});
router.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        if (req.file) {
            // Upload successful
            const imagePath = path_1.default.join('Uploads', req.file.filename);
            console.log('Image uploaded successfully:', imagePath);
            res.status(200).json({ success: true, imagePath: imagePath });
            // Generate the image URL
            const imageURL = `http://localhost:3000/${imagePath}`;
            // Get the logged-in user's ID to insert the image URL
            const userId = req.body.UserID;
            // Update the user's image URL in the database
            await UserModel_1.default.update({ ImageURL: imageURL }, {
                where: { UserID: userId } // Assuming you have the user ID in req.user
            });
            // Send a response
            res.status(200).json({ success: true, imageURL: imageURL });
        }
        else {
            // No file was uploaded
            console.error('No file uploaded');
            res.status(400).json({ error: 'No file uploaded' });
        }
    }
    catch (err) {
        // Error handling
        console.error('Error uploading image:', err);
        res.status(500).json({ error: 'Internal server error' });
=======
const multexMiddleware_1 = require("../middleware/multexMiddleware");
const cors_1 = __importDefault(require("cors"));
const userMiddleware_1 = require("../middleware/userMiddleware");
const router = express_1.default.Router();
// Enable CORS for all routes
router.use((0, cors_1.default)());
const upload = multexMiddleware_1.upload.single('image');
router.post('/api/upload', upload, userMiddleware_1.userMiddleware, multexMiddleware_1.uploadMiddleware, (req, res) => {
    try {
        res.status(201).send({ message: 'Image uploaded successfully' });
    }
    catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).send({ error: 'Error uploading image' });
>>>>>>> 58fd192 (FileUpload-Complete)
    }
});
exports.default = router;
//# sourceMappingURL=imageRoutes.js.map