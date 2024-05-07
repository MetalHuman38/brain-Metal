"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImageStorageModel_1 = __importDefault(require("../utils/models/ImageStorageModel"));
const ImageStorageController = {
    // Add more functions as needed
    getImageByURL: async (imageUrl) => {
        try {
            // Find the image in the database by its URL
            const image = await ImageStorageModel_1.default.findOne({ where: { ImageURL: imageUrl } });
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
};
exports.default = ImageStorageController;
//# sourceMappingURL=ImageStorageController.js.map