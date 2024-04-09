"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loggerMiddleware_1 = require("../middleware/loggerMiddleware");
require("dotenv/config");
const testDatabase_1 = __importDefault(require("../utils/testDatabase"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const postRoutes_1 = __importDefault(require("./postRoutes"));
const likesRoutes_1 = __importDefault(require("./likesRoutes"));
const commentRoutes_1 = __importDefault(require("./commentRoutes"));
const router = express_1.default.Router();
router.use(authRoutes_1.default);
// Use the user router for handling user-related routes
router.use(userRoutes_1.default);
// Use the post router for handling post-related routes
router.use(postRoutes_1.default);
// Use the likes router for handling likes-related routes
router.use(likesRoutes_1.default);
// Use the comment router for handling comment-related routes
router.use(commentRoutes_1.default);
// Use the logger middleware for all routes
router.use(loggerMiddleware_1.logger);
router.get('/Get-User', async (req, res) => {
    try {
        (0, testDatabase_1.default)();
        res.send('Query executed successfully!');
    }
    catch (error) {
        console.error('Query Error, cant reach database:', error);
        res.status(500).send('Error connecting to the database.');
    }
});
exports.default = router;
//# sourceMappingURL=router.js.map