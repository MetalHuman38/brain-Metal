import ImageStorage from '../utils/models/ImageStorageModel';


const ImageStorageController = {
  // Add more functions as needed
getImageByURL: async (imageUrl: string) => {
    try {
        // Find the image in the database by its URL
        const image = await ImageStorage.findOne({ where: { ImageURL: imageUrl } });
        if (image) {
            return image;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
},
// Delete File by ID function
};


export default ImageStorageController;

