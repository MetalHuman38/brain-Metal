"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const postController_1 = require("../controllers/postController");
// Create a new router
const router = express_1.default.Router();
router.use((0, cors_1.default)());
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
// Get Recent Posts
router.get('/getRecentPosts', postController_1.getRecentPosts);
router.get('/getPostById', postController_1.getPostById);
// Update post by ID
router.put('/updatePostById', postController_1.updatePostById);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map