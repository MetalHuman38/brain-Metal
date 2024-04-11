"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.saveImageAndUrlToDatabase = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function saveImageAndUrlToDatabase(imageFile, imageDirectory) {
    const imageFilename = `${Date.now()}_${path_1.default.basename(imageFile.toString())}`;
    const imagePath = path_1.default.join(imageDirectory, imageFilename);
    try {
        // Move image file to directory
        fs_1.default.copyFileSync(imageFile, imagePath);
        return imagePath;
    }
    catch (error) {
        console.error('Error saving image:', error);
        throw new Error('Error saving image');
    }
}
exports.saveImageAndUrlToDatabase = saveImageAndUrlToDatabase;
/**
 * Deletes a file from the file system.
 * @param {string} filePath - The path to the file to be deleted.
 * @returns {Promise<void>} - A Promise that resolves when the file is deleted successfully.
 */
async function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        fs_1.default.unlink(filePath, (error) => {
            if (error) {
                reject(error); // Reject the Promise if an error occurs
            }
            else {
                resolve(); // Resolve the Promise if the file is deleted successfully
            }
        });
    });
}
exports.deleteFile = deleteFile;
//# sourceMappingURL=ImageUtils.js.map