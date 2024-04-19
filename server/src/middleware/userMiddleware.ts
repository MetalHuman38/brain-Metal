// userMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Users from '../utils/models/UserModel';
import 'dotenv/config';

declare global {
    namespace Express {
      interface Request {
        currentUser?: { UserID: number};
      }
    }
  }

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the JWT token from the request headers
        const authHeader = req.headers.authorization;
        console.log('Received token:', authHeader);

        if (authHeader) {
            console.log('Token found:', authHeader);
            return res.status(401).send({ error: 'Unauthorized' });
        }

        const token = authHeader?.split(' ')[1];
        console.log('Received token:', token);
        if (!token) {
            return res.status(401).send({ error: 'JWT token is missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { UserID: number };
        console.log('Decoded token:', decoded);
        const user = await Users.findByPk(decoded.UserID);
        console.log('User found:', user);
        if (user) {
            req.currentUser = { UserID: decoded.UserID };
        } else{
            console.error('user not found');
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        if (!user.refreshToken?.includes(token)) {
            console.error('Refresh Token does not match');
            return res.status(401).send({ error: 'Unauthorized' });
        }

        req.currentUser = { UserID: decoded.UserID };
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(401).send({ error: 'Unauthorized' });
        next(error);
    }
};

export default userMiddleware;
