import { NextFunction, Request, Response } from 'express';
import UserRegistrations from '../utils/models/UserRegistrationModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Users from '../utils/models/UserModel';
import { VerifyErrors } from 'jsonwebtoken';


dotenv.config();

// Extend the Express Request type to include a currentUser property
declare global {
    namespace Express {
        interface Request {
            currentUser?: { UserID: number };
        }
    }
}


function hasErrors(err: any): err is  { errors: any }{
    return err && typeof err.errors === 'object';
}

// Function to handle errors
export const handleError = (err: Error & { code?: number }, res: Response): void => {
    console.error(err.message);

    // Initialize errors object
    let errors: { [key: string]: string } = {};

    // Handle specific errors cases
    if(err.message.includes('New User validation error')){
        errors = {
            name: 'Name is required',
            username: 'Username is required',
            email: 'Email is required',
            password: 'Password is required',
        };
    }

    if(err.message.includes('UserRegistrations.Email')){
        errors.email = 'Email is already registered';
    }

    if(err.message.includes('incorrect email')){
        errors.email = 'Email is not registered';
    }

    if(err.message.includes('Incorrect password')){
        errors.password = 'Password is incorrect';
    }

    // Handle Sequelize validation errors
    if(hasErrors(err)){
        errors = err.errors.reduce((acc: { [key: string]: string }, error: any) => {
            acc[error.path] = error.message;
            return acc;
        }, {});
    }

    res.status(err.code || 500).json({ errors });

}

// Create Token
const maxAge = 3 * 24 * 60 * 60;
// const createToken = (UserID: number) => {
//     return jwt.sign({UserID}, 'metal ninja secret', as string, { expiresIn: maxAge})
// }

export function generateToken(UserID: number): string {
    const token = jwt.sign({ UserID }, 'metal ninja secret' as string , { expiresIn: maxAge });
    return token;
}


// Create a function to register new User
export const registerUser = async (req: Request, res: Response): Promise<void> => {

    const { name, username, email, password} = req.body

    try {
        
        const user = await UserRegistrations.create({
            NewUser: name,
            Username: username,
            Email: email,
            HashedPassword: password,
            
        });
        const token = generateToken(user.UserID);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user: user.UserID })

    } catch (error: any) {
        handleError(error, res);
        console.log('Error creating new user:', error)
    }
};


export const handleLogin = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body;

    try {
        const user = await UserRegistrations.loginUser(email, password);
        if (!user) {
            throw new Error('incorrect email');
        }
        const token = generateToken(user.UserID);
        const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
        const expires = new Date(Date.now() + maxAge * 1000);
        // Set cookies to local storage in browser
        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: true, maxAge: maxAge * 1000, expires });
        // set headers for the user
        res.setHeader('Authorization', `Bearer ${token}`);
        // add cookie to local storage
        res.locals.user = user;
        res.status(200).json({ token, user: user.UserID});
    } catch (error: any) {
        handleError(error, res);
    }
}

// function to get current user
export const getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.body || req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'metal ninja secret' as string, async (err: VerifyErrors | null, decodedToken: any) => {
            console.log('decoded token:', decodedToken);
            if (err) {
                console.error(err.message);
                res.locals.user = null;
            } else {
                const user = await Users.findByPk(decodedToken.UserID);
                res.locals.user = user;
            }
        });
    } else {
        res.locals.user = null;
        res.status(200).json({ token, user: token.UserID});
        next();
    }
}



// function to logout user
export const logoutUser = (req: Request, res: Response): void => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
    res.status(200).json({ message: 'User logged out' });   
};


export default { registerUser, handleLogin, getCurrentUser, logoutUser};
