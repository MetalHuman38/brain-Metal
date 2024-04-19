import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    console.log('Request IP:', req.ip);
    console.log('Request Time:', new Date());
    next();
}