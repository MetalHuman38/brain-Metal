"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEvent = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const fsPromises = fs_1.default.promises;
// Define custom destination directory
const newLogDir = '/home/bkalejaiye/brainv3/server';
async function logEvent(message, logname) {
    const dateTime = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logItem = `${dateTime}\t${(0, uuid_1.v4)()}\t${message}\n`;
    try {
        const logDir = path_1.default.join(newLogDir, 'logs');
        if (!fs_1.default.existsSync(logDir)) {
            await fsPromises.mkdir(logDir, { recursive: true });
        }
        await fsPromises.appendFile(path_1.default.join(logDir, logname), logItem);
    }
    catch (error) {
        console.error('Error logging event:', error);
    }
}
exports.logEvent = logEvent;
const loggerInfo = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
};
exports.default = loggerInfo;
//# sourceMappingURL=logEventMiddleware.js.map