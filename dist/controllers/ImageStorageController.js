"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../utils/models/UserModel"));
const ImageStorageController = {
    // Function to get a file preview by ID
    getFilePreview: async (ImageID) => {
        try {
            // Find the image in the database by its ID
            const imageid = await UserModel_1.default.findByPk(ImageID);
            if (imageid) {
                return imageid.ImageURL;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Error fetching file preview:', error);
            throw error;
        }
    },
    // Add more functions as needed
    getImageByURL: async (imageUrl) => {
        try {
            // Find the image in the database by its URL
            const image = await UserModel_1.default.findOne({ where: { ImageURL: imageUrl } });
            if (image) {
                return image;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Error fetching image:', error);
            throw error;
        }
    },
    // Delete File by ID function
    deleteFile: async (ImageID) => {
        try {
            // Find the image in the database by its ID
            const image = await UserModel_1.default.findByPk(ImageID);
            if (image) {
                // Delete the image from the database
                await image.destroy();
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }
};
exports.default = ImageStorageController;
//# sourceMappingURL=ImageStorageController.js.map