"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
// Define custom destination directory
const uploadDir = '/home/bkalejaiye/brainv3/server/src/utils/Uploads';
const storage = multer_1.default.diskStorage({
    destination: uploadDir,
    filename: function (_req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.upload = upload;
const uploadMiddleware = async (req, res) => {
    try {
        if (req.file) {
            console.log('File uploaded:', req.file);
            // Return a success message
            const imageUrl = path_1.default.join(uploadDir, req.file.filename);
            console.log('Image URL:', imageUrl);
            // Save the image URL to the database
            const user = await UserModel_1.default.findOne({ where: { UserID: req.currentUser?.UserID } });
            if (!user) {
                console.error('User not found');
                res.status(404).send({ error: 'User not found' });
                return;
            }
            // Update the user's profile picture
            await user.update({ ImageURL: imageUrl });
            console.log('Image uploaded successfully:', imageUrl);
            res.status(201).send({ message: 'Image uploaded successfully' });
        }
        else {
            console.error('Error uploading image');
            res.status(400).send({ error: 'Error uploading image' });
        }
    }
    catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).send({ error: 'Error uploading image' });
    }
};
exports.uploadMiddleware = uploadMiddleware;
//# sourceMappingURL=multexMiddleware.js.map