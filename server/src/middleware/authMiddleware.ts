import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserRegistrations from '../utils/models/UserRegistrationModel';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            currentUser?: { UserID: number };
        }
    }
}

// Require authentication
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
const checkUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const token = req.cookies.jwt;

    // Check if token exists
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET as string, async (err: VerifyErrors | null, decodedToken: any) => {
            if (err) {
                console.error(err.message);
                res.locals.user = null;
                next();
            } else {
                try {
                    // Fetch the user object from the database based on the decoded user ID
                    const user = await UserRegistrations.findByPk(decodedToken.UserID);
                    // Set the user object to res.locals.user
                    res.locals.user = user;

                    next();
                } catch (error) {
                    console.error('Error fetching user:', error);
                    res.locals.user = null;
                    next();
                }
            }
        });
    } else {
        // If token does not exist, set res.locals.user to null
        res.locals.user = null;
        next();
    }
};

export { requireAuth, checkUser };