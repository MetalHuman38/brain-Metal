"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loggerMiddleware_1 = require("../middleware/loggerMiddleware");
require("dotenv/config");
const NewPostRoutes_1 = __importDefault(require("./NewPostRoutes"));
const postRoutes_1 = __importDefault(require("./postRoutes"));
const likesRoutes_1 = __importDefault(require("./likesRoutes"));
const commentRoutes_1 = __importDefault(require("./commentRoutes"));
const imageRoutes_1 = __importDefault(require("./imageRoutes"));
const authenticateRoutes_1 = __importDefault(require("./authenticateRoutes"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = express_1.default.Router();
router.use((0, cors_1.default)());
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
router.use(authenticateRoutes_1.default);
router.use(userRoutes_1.default);
// Use the NewPost router for handling post-related routes
router.use(NewPostRoutes_1.default);
// Use the post router for handling post-related routes
router.use(postRoutes_1.default);
// Use the likes router for handling likes-related routes
router.use(likesRoutes_1.default);
// Use the comment router for handling comment-related routes
router.use(commentRoutes_1.default);
// Use Image router for handling image-related routes
router.use(imageRoutes_1.default);
router.use(loggerMiddleware_1.logger);
router.post('/test', (req, res) => {
    res.send('Test route success');
});
// testDatabase 
// router.get('/getAllUserr', async (req: Request, res: Response) => {
//     try {
//         const users = await getUsers();
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error getting users:', error);
//         res.status(500).json({ message: 'Error getting users' });
//     }
// }
// );
exports.default = router;
//# sourceMappingURL=router.js.map