"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// Enable CORS for all routes
router.use((0, cors_1.default)());
// Set storage engine
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, 'src', 'Uploads'),
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        cb(null, `${timestamp}_${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
});
router.post('/api/upload', upload.single('image'), (req, res) => {
    if (Error instanceof multer_1.default.MulterError) {
        // Multer error (e.g., file size exceeded)
        console.error('Multer error:', Error);
        res.status(400).json({ error: 'File upload failed', details: Error.message });
    }
    else if (Error instanceof Error) {
        // Other errors
        console.error('Error uploading image:', Error);
        res.status(500).json({ error: 'Internal server error' });
    }
    else {
        // Upload successful
        if (req.file) {
            const imagePath = path_1.default.join('Uploads', req.file.filename);
            console.log('Image uploaded successfully:', imagePath);
            res.status(200).json({ success: true, imagePath: imagePath });
        }
        else {
            console.error('Error uploading image: req.file is undefined');
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});
exports.default = router;
//# sourceMappingURL=imageRoutes.js.map