import sharp from 'sharp';

async function createImageThumbnail(imagePath: string, thumbnailPath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        sharp(imagePath)
            .resize(200, 200) // Adjust dimensions as needed
            .toFile(thumbnailPath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(thumbnailPath);
                }
            });
    });
}

export default createImageThumbnail;