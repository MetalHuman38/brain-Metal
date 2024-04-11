"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const postController_1 = require("../controllers/postController");
const router = express_1.default.Router();
// Enable CORS for all routes
router.use((0, cors_1.default)());
// Create a new post
router.post('/api/createPost', postController_1.createPost);
// Get Recent Posts
router.get('/api/getRecentPosts', postController_1.getRecentPosts);
// Get post by ID
router.get('/api/getPostById', postController_1.getPostById);
// Update post by ID
router.put('/api/updatePostById', postController_1.updatePostById);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map