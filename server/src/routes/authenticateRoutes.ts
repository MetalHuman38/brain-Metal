import express from 'express';
import * as authenticateCon  from '../controllers/authenticateCon';
import cors from 'cors';
import { requireAuth } from '../middleware/authMiddleware';
import { userMiddleware } from '../middleware/userMiddleware';

const router = express.Router();

router.use(cors());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true')
    next();
  })

router.post('/handleRegister', authenticateCon.registerUser);

router.post('/handleLoginAuth', authenticateCon.handleLogin);

router.get('/getCurrentUser', authenticateCon.getCurrentUser);

router.get('/handleLogout', authenticateCon.logoutUser);

export default router;
