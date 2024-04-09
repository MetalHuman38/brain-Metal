import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    next();
}