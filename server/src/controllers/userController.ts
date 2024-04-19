// userController.ts contains the controller functions for user registration and login.
import bcrypt, { hash } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { generateAvatarUrl } from '../utils/avatarUtils';
import { INewUser } from '../utils/types';
import UserRegistrations from '../utils/models/UserRegistrationModel';
import Users from '../utils/models/UserModel';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { generateToken } from './authController';
import { refreshToken } from './authController';
import path from 'path';

// import User.json from '../models/User.json';


// Controller function to handle user registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {

    // Extract user data from request body
    const userData: INewUser = req.body;
    if (!userData) {
      res.status(400).json({ message: 'Invalid user data' });
      return;
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10); // Adjust the salt rounds as needed

    if (!hashedPassword) {
      res.status(400).json({ message: 'Error hashing password.' });
      return;
    }
    // Create a new user in the database
    const newAccount = await UserRegistrations.createUser(
      userData.name,
      userData.username,
      userData.email,
      hashedPassword
    );

    if (!newAccount) {
      res.status(400).json({ message: 'Error creating user account.' });
      return;
    }

    // Generate an avatar URL based on the user's name
    const avatarUrl = generateAvatarUrl(userData.name);

    // Create a new user object
    const newUser = await SaveUserToDatabase({
      UserID: newAccount.UserID,
      MemberName: userData.name,
      Username: userData.username,
      Email: userData.email,
      hashedPassword: hashedPassword,
      Bio: null,
      Status: 'unverified',
      Join: new Date(),
      AvatarUrl: avatarUrl,
      ImageUrl: null,
      Label: null,
      LastActivity: null,
      UpdatedAt: new Date(),
      refreshToken: [""]
    });


    if (!newUser) {
      res.status(400).json({ message: 'Error creating user account.' });
      return newUser;
    }

    // Check for duplicate username in Database
    const duplicateUsername = await Users.findUsername(userData.username);
    if (duplicateUsername) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to save user data to the database
export async function SaveUserToDatabase(user: {
  UserID: number;
  MemberName: string;
  Username: string;
  Email: string;
  hashedPassword: string;
  Status: string;
  Bio?: string | null;
  Join: Date;
  AvatarUrl: string;
  ImageUrl: string | null;
  Label?: string | null;
  LastActivity: Date | null;
  UpdatedAt: Date;
  refreshToken: [string];
  
}) {
  try{
    // Create a new user object
    const newUser = await Users.createUser({
      UserID: user.UserID,
      MemberName: user.MemberName,
      Username: user.Username,
      Email: user.Email,
      HashedPassword: user.hashedPassword,
      Status: user.Status, 
      Bio: user.Bio || null, 
      AvatarUrl: user.AvatarUrl,
      ImageURL: user.ImageUrl || null, 
      Label: user.Label || null, 
      Join: user.Join,
      Last_activity: user.LastActivity === null ? undefined : user.LastActivity, 
      Updated_at: user.UpdatedAt, 
      refreshToken: user.refreshToken
      
    });
    return newUser;
  }catch(error){
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
}

// Controller function to handle user login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  
  try { 
    
    const { email, password } = req.body;
    console.log('email', email);
    console.log(req.body);

    // Find the user by email
    const user = await Users.findByEmail(email);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Validate password
    const passwordMatch = await bcrypt.compare(password, user.HashedPassword);
    
    // Perform password validation (you would typically use a password hashing library here)
    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT token for the user
    const accessToken = generateToken(user.UserID); // Issue token for the logged in user

    const refresh = refreshToken(user.UserID);

    // Create a object to store the token in the database
    const saveToken = async (UserID: number, refreshToken: string) => {
      const user = await Users.findByPk(UserID);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      user.refreshToken = [refreshToken];
      await user.save();
    };

    await saveToken(user.UserID, refresh);
    
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
    res.cookie('refreshToken', refresh, { httpOnly: true, secure: true, sameSite: 'none' });
    
    const tokenResponse = {
      accessToken,
      refreshToken: refresh,
      user: {
        UserID: user.UserID,
        MemberName: user.MemberName,
        Username: user.Username,
        Email: user.Email,
        ImageUrl: user.ImageURL,
        AvatarUrl: user.AvatarUrl,
        Bio: user.Bio || '',
      },
    };
    
    res.status(200).json({ message: 'User logged in successfully', tokenResponse});

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export async function getCurrentUser (req: Request, res: Response): Promise<void> {
  try {
  
    const token = req.cookies.accessToken;
    if (!token){
         res.status(401).json({ message: 'Unauthrized: No Token provided' });
          return;
      };

    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!verified) {
        res.status(401).json({ message: 'Unauthrized: Invalid Token' });
        return;
    }

    const UserID = (verified as { user: { UserID: string } }).user.UserID;
    const user = await Users.findByPk(UserID);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to handle user logout
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('accessToken',{
      httpOnly:true,
      secure:true,
      sameSite:'none'
    });
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

