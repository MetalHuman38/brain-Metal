import { Identifier } from 'sequelize';
import ImageStorage from '../utils/models/UserModel';


const ImageStorageController = {
  // Function to get a file preview by ID
  getFilePreview: async (ImageID: Identifier | undefined) => {
    try {
      // Find the image in the database by its ID
      const imageid = await ImageStorage.findByPk(ImageID);
      if (imageid) {
        return imageid.ImageURL;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching file preview:', error);
      throw error;
    }
  },
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
deleteFile: async (ImageID: Identifier | undefined) => {
    try {
        // Find the image in the database by its ID
        const image = await ImageStorage.findByPk(ImageID);
        if (image) {
            // Delete the image from the database
            await image.destroy();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
}

};


export default ImageStorageController;

