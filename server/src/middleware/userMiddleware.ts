// userMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Users from '../utils/models/UserModel';

declare global {
    namespace Express {
      interface Request {
        currentUser?: { UserID: number };
      }
    }
  }

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the JWT token from the request headers
        const token = req.headers.authorization?.split(' ')[1]; // Add a check for undefined
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string)as { UserID: number };
            const  user = await Users.findByPk(decoded.UserID as number);
            if (user){
                req.currentUser = user;
            } else {
                console.error('user not found');
                res.status(401).send({ error: 'Unauthorized' });
                return;
            }
        }
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(401).send({ error: 'Unauthorized' });
        next(error);
    }
};
