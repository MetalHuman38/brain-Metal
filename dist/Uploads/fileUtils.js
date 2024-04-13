"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePreview = void 0;
const path_1 = __importDefault(require("path"));
const ImageThumbnail_1 = __importDefault(require("./ImageThumbnail"));
async function getFilePreview(file) {
    // Check if the file exists
    if (!file || !file.path) {
        console.error('Invalid file:', file);
        return null;
    }
    try {
        // If it's an image file, generate a thumbnail
        if (isImageFile(file.originalname)) {
            const thumbnailPath = await (0, ImageThumbnail_1.default)(file.path, `${file.path}.thumbnail`);
            return thumbnailPath;
        }
        else {
            // For other types of files, return null (or some other representation)
            return null;
        }
    }
    catch (error) {
        console.error('Error generating file preview:', error);
        return null;
    }
}
exports.getFilePreview = getFilePreview;
function isImageFile(filename) {
    const extension = path_1.default.extname(filename).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(extension);
}
//# sourceMappingURL=fileUtils.js.map