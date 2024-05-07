"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const NewPostModel_1 = __importDefault(require("../utils/models/NewPostModel"));
// Create a new post
const createPost = async (req, res) => {
    try {
        const post = req.body;
        const Newpost = await NewPostModel_1.default.createPost({
            Caption: post.caption,
            ImageURL: req.file ? req.file.path : null,
            Location: post.location || null,
            Tags: post.tags || '',
            CreatedAt: new Date()
        });
        if (!Newpost) {
            res.status(400).json({ message: 'Error creating new post.' });
            return;
        }
        res.status(201).json({ message: 'Post created successfully', post: Newpost });
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createPost = createPost;
//# sourceMappingURL=NewPostController.js.map