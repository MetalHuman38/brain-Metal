import path from 'path';
import createImageThumbnail from './ImageThumbnail';

export interface UploadedFile {
    // Define the properties of the UploadedFile type here
    path: string;
    originalname: string;
    mimetype: string;
    size: number;

}

export async function getFilePreview(file: UploadedFile): Promise<string | null> {
    // Check if the file exists
    if (!file || !file.path) {
        console.error('Invalid file:', file);
        return null;
    }

    try {
        // If it's an image file, generate a thumbnail
        if (isImageFile(file.originalname)) {
            const thumbnailPath = await createImageThumbnail(file.path, `${file.path}.thumbnail`);
            return thumbnailPath;
        } else {
            // For other types of files, return null (or some other representation)
            return null;
        }
    } catch (error) {
        console.error('Error generating file preview:', error);
        return null;
    }
}

function isImageFile(filename: string): boolean {
    const extension = path.extname(filename).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(extension);
}


