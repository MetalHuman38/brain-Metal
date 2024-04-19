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

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied - No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { UserID: number };
        console.log('decoded', decoded);
        const  user = await Users.findByPk(decoded.UserID);
            if (user){
                req.currentUser = { UserID: decoded.UserID };;
            } else {
                console.error('user not found');
                res.status(401).send({ error: 'Unauthorized' });
                return;
            }
        req.body = decoded;
        console.log('decoded reqbody', decoded);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
} 


// export function authenticate(req: Request, res: Response, next: NextFunction) {

//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Access Denied - No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//         req.body = decoded;
//         console.log('decoded', decoded);
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// } 

export function authorize(req: Request, res: Response, next: NextFunction) {
    if (req.currentUser?.UserID !== req.body.UserID) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}