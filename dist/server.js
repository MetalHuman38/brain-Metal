"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const router_1 = __importDefault(require("./routes/router"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Cors middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '/dist')));
app.use((0, cookie_parser_1.default)());
// Use the router for all routes
app.use(router_1.default);
// Error handler middleware
app.use(async (req, res, next) => {
    try {
        const error = CreateError(404, 'API route not found');
        throw error;
    }
    catch (err) {
        next(err);
    }
});
app.use(async (err, req, res, next) => {
    try {
        res.status(err.status || 500);
        res.send({
            error: {
                status: err.status || 500,
                message: err.message,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
// Start the server
async function startServer() {
    try {
        await new Promise((resolve, reject) => {
            server.on('request', app);
            server.listen(process.env.PORT || 3000, () => {
                resolve();
            });
        });
    }
    catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Exit process with error code
    }
}
const server = http_1.default.createServer();
server.on('clientError', (err, socket) => {
    socket.destroy(); // Destroy the socket to prevent further events
});
startServer();
function CreateError(arg0, arg1) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=server.js.map