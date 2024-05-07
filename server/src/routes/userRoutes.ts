import express from 'express';
import cors from 'cors';
import Users from '../utils/models/UserModel';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.use(cors());

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
})


// Define a route to fetch user data
router.get('/currentUser', async (req, res) => {
  try {

    // verify the token
    const token = req.headers.authorization?.split(' ')[1]; // Add a check for undefined
    if (token) {
      const decoded = jwt.verify(token, 'metal ninja secret' as string) as { UserID: number };
      const user = await Users.findByPk(decoded.UserID as number);
      if (user) {
        req.currentUser = user;
      } else {
        console.error('user not found');
        res.status(401).send({ error: 'Unauthorized' });
        return;
      }
    }
    const userId = req.body; // Convert userId to a number
    const user = await Users.findOne(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;