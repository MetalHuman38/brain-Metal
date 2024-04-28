"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multexMiddleware_1 = require("../middleware/multexMiddleware");
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
// Enable CORS for all routes
router.use((0, cors_1.default)());
const upload = multexMiddleware_1.upload.single('image');
router.post('/api/upload', upload, multexMiddleware_1.uploadMiddleware, (req, res) => {
    try {
        res.status(201).send({ message: 'Image uploaded successfully' });
    }
    catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).send({ error: 'Error uploading image' });
    }
});
exports.default = router;
//# sourceMappingURL=imageRoutes.js.map