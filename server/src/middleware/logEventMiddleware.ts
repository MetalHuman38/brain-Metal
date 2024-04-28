import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const fsPromises = fs.promises;


// Define custom destination directory
const newLogDir = '/home/bkalejaiye/brainv3/server';

export async function logEvent(message: string, logname: string) {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

    try {
        const logDir = path.join(newLogDir, 'logs');
        if (!fs.existsSync(logDir)) {
            await fsPromises.mkdir(logDir, { recursive: true });
        }

        await fsPromises.appendFile(path.join(logDir, logname), logItem);
    } catch (error) {
        console.error('Error logging event:', error);
    }
}

const loggerInfo = (req: any, res: any, next: any) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
};

export default loggerInfo;






