import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import Users from '../utils/models/UserModel';


declare global {
    namespace Express {
        interface Request {
            currentUser?: { UserID: number };
        }
    }
}
const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.jwt;

    // Check if token exists
    if (token) {
        jwt.verify(token, 'metal ninja secret', (err: VerifyErrors | null, decodedToken: any) => {
            if (err) {
                console.error(err.message);
                res.redirect('/login');
            } else {
                const { UserID } = decodedToken; // Destructure UserID from decodedToken
                req.currentUser = { UserID }; // Assign UserID to req.currentUser
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

// Check current user
const checkUser = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.jwt;

    // Check if token exists
    if (token) {
        jwt.verify(token, 'metal ninja secret', async (err: VerifyErrors | null, decodedToken: any) => {
            if (err) {
                console.error(err.message);
                res.locals.user = null;
                next();
            } else {
                const user = await Users.findByPk(decodedToken.UserID);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

export default { requireAuth, checkUser };