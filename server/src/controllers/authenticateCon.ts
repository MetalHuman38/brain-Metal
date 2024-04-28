import { NextFunction, Request, Response } from 'express';
import UserRegistrations from '../utils/models/UserRegistrationModel';
import Users from '../utils/models/UserModel';
import jwt, { VerifyErrors } from 'jsonwebtoken';


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
const createToken = (UserID: number) => {
    return jwt.sign({UserID}, 'metal ninja secret', { expiresIn: maxAge})
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
        const token = createToken(user.UserID);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user: user.UserID })

    } catch (error: any) {
        handleError(error, res);
        console.log('Error creating new user:', error)
        res.status(500).json({ message: 'cannot create a new user' });
    }
};


export const handleLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await UserRegistrations.loginUser(email, password);
        if (!user) {
            throw new Error('incorrect email');
        }
        const token = createToken(user.UserID);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({ user: user.UserID });
    } catch (error: any) {
        handleError(error, res);
    }
}


// Function to get the current user
export const handleCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user } = req.body;
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const currentUser = await UserRegistrations.findUserByEmail(user.UserID);
        if (!currentUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ user: currentUser });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Error getting user' });
    }
}

// function to logout user
export const logoutUser = (req: Request, res: Response): void => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
    res.status(200).json({ message: 'User logged out' });   
};


export default { registerUser, handleLogin, handleCurrentUser, logoutUser};
