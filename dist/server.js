"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const router_1 = __importDefault(require("./routes/router"));
const testDatabase_1 = __importDefault(require("./utils/testDatabase"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Cors middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// Use the router for all routes
app.use(router_1.default);
// Start the server
async function startServer() {
    try {
        await (0, testDatabase_1.default)(); // Log database version
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
startServer();
//# sourceMappingURL=server.js.map