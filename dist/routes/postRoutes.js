"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const postController_1 = require("../controllers/postController");
const userMiddleware_1 = require("../middleware/userMiddleware");
// Create a new router
const router = express_1.default.Router();
// Enable CORS for all routes
router.use((0, cors_1.default)());
// Get post by ID
router.get('/api/getPosts', userMiddleware_1.userMiddleware, postController_1.getPostById);
// Get Recent Posts
router.get('/api/getRecentPosts', postController_1.getRecentPosts);
// Update post by ID
router.put('/api/updatePostById', postController_1.updatePostById);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map