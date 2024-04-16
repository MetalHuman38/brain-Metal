import { Request, Response } from 'express'; // Import the Request and Response types from express
import multer from 'multer';
import path from 'path';
import Users from '../utils/models/UserModel';
import { userMiddleware } from './userMiddleware';


// Define custom destination directory
const uploadDir = '/home/bkalejaiye/brainv3/server/src/utils/Uploads';

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

const uploadMiddleware = async (req: Request, res: Response) => { 
  try {
    if (req.file) {
      console.log('File uploaded:', req.file)
      // Return a success message
      const imageUrl = path.join(uploadDir, req.file.filename);
      console.log('Image URL:', imageUrl);
      // Save the image URL to the database

      const user = await Users.findOne({ where: { UserID: req.currentUser?.UserID } });
      if (!user) {
        console.error('User not found');
        res.status(404).send({ error: 'User not found' });
        return;
      }

      // Update the user's profile picture
      await user.update({ ImageURL: imageUrl });

      console.log('Image uploaded successfully:', imageUrl);
      res.status(201).send({ message: 'Image uploaded successfully' });
    } else {
      console.error('Error uploading image');
      res.status(400).send({ error: 'Error uploading image' });
    }
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).send({ error: 'Error uploading image' });
  }
};

export { uploadMiddleware, upload };

