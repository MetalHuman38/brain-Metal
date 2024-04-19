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
    if(!token) {
        return { error: 'Token is required' };
    } else if(token === 'null') {
        return { error: 'Token is null' };
    }
    return jwt.verify(token, process.env.JWT_SECRET as string);
}

export function getTokenCurrentUser(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}


// Function to refresh JWT token
export function refreshToken(UserID: number): string {
    const token = jwt.sign({ UserID }, process.env.JWT_SECRET as string, { expiresIn: maxAge });
    return token;
}

// Function to clear JWT token (called when user logs out)
export function clearToken(): void {
    localStorage.removeItem('token');
}


export default { generateToken, 
                   verifyToken, 
                   refreshToken, 
                   clearToken, 
                   getTokenCurrentUser 
               };