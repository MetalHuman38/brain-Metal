"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const router_1 = __importDefault(require("./routes/router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const logEventMiddleware_1 = require("./middleware/logEventMiddleware");
const authenticateRoutes_1 = __importDefault(require("./routes/authenticateRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)());
// Log all requests
app.use((req, res, next) => {
    (0, logEventMiddleware_1.logEvent)(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    next();
});
// Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '/dist')));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Use the router for all routes
app.use('/', router_1.default);
app.use(authenticateRoutes_1.default);
app.use('/set-cookie', (req, res) => {
    res.cookie('cookieName', 'cookieValue', { maxAge: 900000 });
    res.send('Cookie set');
});
app.use('/get-cookie', (req, res) => {
    const cookie = req.cookies.cookieName;
    console.log(cookie);
    res.json({ cookie });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map