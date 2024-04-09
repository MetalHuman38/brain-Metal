import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied - No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body = decoded;
        console.log('decoded', decoded);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
} 


   