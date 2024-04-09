"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImageAndUrlToDatabase = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function saveImageAndUrlToDatabase(imageFile, imageDirectory) {
    const imageFilename = `${Date.now()}_${path_1.default.basename(imageFile.toString())}`;
    const imagePath = path_1.default.join(imageDirectory, imageFilename);
    // Move image file to directory
    fs_1.default.copyFileSync(imageFile, imagePath);
}
exports.saveImageAndUrlToDatabase = saveImageAndUrlToDatabase;
//# sourceMappingURL=ImageUtils.js.map