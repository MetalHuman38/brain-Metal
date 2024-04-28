import express from 'express';
import * as authenticateCon  from '../controllers/authenticateCon';
import cors from 'cors';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.use(cors());

router.post('/handleRegister', authenticateCon.registerUser);

router.post('/handleLoginAuth', authenticateCon.handleLogin);

router.get('/handleCurrentUser', authMiddleware.checkUser, authenticateCon.handleCurrentUser);

router.get('/handleLogout', authenticateCon.logoutUser);


export default router;
