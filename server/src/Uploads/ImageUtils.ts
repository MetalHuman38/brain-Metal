import fs from 'fs';
import path from 'path';


export async function saveImageAndUrlToDatabase(imageFile: fs.PathLike, imageDirectory: string) {
    const imageFilename = `${Date.now()}_${path.basename(imageFile.toString())}`;
    const imagePath = path.join(imageDirectory, imageFilename);

    try{
        // Move image file to directory
    fs.copyFileSync(imageFile, imagePath);
    return imagePath;
} catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Error saving image');
   }
}

/**
 * Deletes a file from the file system.
 * @param {string} filePath - The path to the file to be deleted.
 * @returns {Promise<void>} - A Promise that resolves when the file is deleted successfully.
 */
export async function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (error) => {
            if (error) {
                reject(error); // Reject the Promise if an error occurs
            } else {
                resolve(); // Resolve the Promise if the file is deleted successfully
            }
        });
    });
}
