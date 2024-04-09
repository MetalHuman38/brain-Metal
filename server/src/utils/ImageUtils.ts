import fs from 'fs';
import path from 'path';

export async function saveImageAndUrlToDatabase(imageFile: fs.PathLike, imageDirectory: string) {
    const imageFilename = `${Date.now()}_${path.basename(imageFile.toString())}`;
    const imagePath = path.join(imageDirectory, imageFilename);

    // Move image file to directory
    fs.copyFileSync(imageFile, imagePath);
}
