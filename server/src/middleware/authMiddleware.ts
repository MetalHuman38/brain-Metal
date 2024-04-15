import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Declare interface for decoded token
interface DecodedToken {
    UserID: number;
    iat: number;
    exp: number;
    user: string;
}

// Middleware to authenticate requests
export function authenticate(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied - No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        req.body = decoded;
        // add user to request object
        req.body.UserID = decoded.UserID;
        console.log('decoded', decoded);
        console.log('req.body', req.body.UserID);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
} 


export default authenticate;
   
