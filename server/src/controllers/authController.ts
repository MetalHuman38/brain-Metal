// authController.ts
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const maxAge = 3 * 24 * 60 * 60;

// Function to generate JWT token
export function generateToken(UserID: number): string {
    const token = jwt.sign({ UserID }, process.env.JWT_SECRET as string, { expiresIn: maxAge });
    return token;
}

export function verifyToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}

export function getTokenCurrentUser(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}


export default { generateToken, verifyToken, getTokenCurrentUser };