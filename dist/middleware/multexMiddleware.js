"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
const dbConfig_1 = require("../utils/dbConfig");
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
            // Get the Sequelize instance
            const sequelize = await (0, dbConfig_1.waitForDB)();
            // Construct the SQL query to insert the image URL into the NewPosts table
            const query = `INSERT INTO ImageStorage (ImageURL) VALUES ('${imageUrl}')`;
            // Execute the raw query using the Sequelize instance
            await sequelize.query(query);
            const userId = req.body; // Convert userId to a number
            const user = await UserModel_1.default.findOne(userId);
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
            console.error('Error uploading image from server console');
            res.status(400).send({ error: 'Error uploading image from server' });
        }
    }
    catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).send({ error: 'Error uploading image from server 500' });
    }
};
exports.uploadMiddleware = uploadMiddleware;
// import { Request, Response } from 'express'; // Import the Request and Response types from express
// import multer from 'multer';
// import path from 'path';
// import Users from '../utils/models/UserModel';
// import { waitForDB } from '../utils/dbConfig';
// // Define custom destination directory
// const uploadDir = '/home/bkalejaiye/brainv3/server/src/utils/Uploads';
// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: function (_req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   }
// });
// const upload = multer({ storage: storage });
// const uploadMiddleware = async (req: Request, res: Response) => { 
//   try {
//     if (req.file) {
//       console.log('File uploaded:', req.file)
//       // Return a success message
//       const imageUrl = path.join(uploadDir, req.file.filename);
//       console.log('Image URL:', imageUrl);
//       // Get the Sequelize instance
//       const sequelize = await waitForDB();
//       // Construct the SQL query to insert the image URL into the NewPosts table
//       const query = `INSERT INTO ImageStorage (ImageURL) VALUES ('${imageUrl}')`;
//       // Execute the raw query using the Sequelize instance
//       await sequelize.query(query);
//       const userId = req.body; // Convert userId to a number
//       const user = await Users.findOne(userId);
//       if (!user) {
//         console.error('User not found');
//         res.status(404).send({ error: 'User not found' });
//         return;
//       }
//       // Update the user's profile picture
//       await user.update({ ImageURL: imageUrl });
//       console.log('Image uploaded successfully:', imageUrl);
//       res.status(201).send({ message: 'Image uploaded successfully' });
//     } else {
//       console.error('Error uploading image file from server');
//       res.status(400).send({ error: 'Error uploading image' });
//     }
//   } catch (err) {
//     console.error('Error uploading image:', err);
//     res.status(500).send({ error: 'Error uploading image' });
//   }
// };
// export { uploadMiddleware, upload };
//# sourceMappingURL=multexMiddleware.js.map