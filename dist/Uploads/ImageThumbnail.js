"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
async function createImageThumbnail(imagePath, thumbnailPath) {
    return new Promise((resolve, reject) => {
        (0, sharp_1.default)(imagePath)
            .resize(200, 200) // Adjust dimensions as needed
            .toFile(thumbnailPath, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(thumbnailPath);
            }
        });
    });
}
exports.default = createImageThumbnail;
//# sourceMappingURL=ImageThumbnail.js.map