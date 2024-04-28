"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const date_fns_1 = require("date-fns"); // Changed from require to ES module import
const uuid_1 = require("uuid"); // Changed from require to ES module import
const fsPromises = fs_1.default.promises;
const logEvent = async (message, logname) => {
    const dateTime = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logItem = `${dateTime}\t${(0, uuid_1.v4)()}\t${message}\n`; // Changed v4 to uuidv4
    try {
        const logDir = path_1.default.join(__dirname, '..', 'logs');
        if (!fs_1.default.existsSync(logDir)) {
            // Create the logs directory if it doesn't exist
            await fsPromises.mkdir(logDir, { recursive: true });
        }
        // Append the log message to the log file
        await fsPromises.appendFile(path_1.default.join(logDir, logname), logItem);
    }
    catch (error) {
        console.error('Error logging event:', error);
    }
};
const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
};
exports.default = { logger, logEvent };
//# sourceMappingURL=logEvents.js.map