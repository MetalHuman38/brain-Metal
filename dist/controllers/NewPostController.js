"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePostToDatabase = exports.createPost = void 0;
const NewPostModel_1 = __importDefault(require("../utils/models/NewPostModel"));
const PostModels_1 = __importDefault(require("../utils/models/PostModels"));
// Create a new post
const createPost = async (req, res) => {
    try {
        const post = req.body;
        const Newpost = await NewPostModel_1.default.createPost({
            NewPostID: 0,
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
        // Create a new post object
        const newPost = await PostModels_1.default.create({
            PostID: 0,
            Likes: 0,
            Caption: post.caption,
            Tags: post.tags || '',
            ImageURL: post.imageURL || null,
            Location: post.location || null,
            CreatedAt: new Date(),
            UpdatedAt: new Date()
        });
        if (!newPost) {
            res.status(400).json({ message: 'Error creating post.' });
            return;
        }
        res.status(201).json(Newpost);
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createPost = createPost;
// Update a post in the database
const savePostToDatabase = async (posts) => {
    try {
        // Create a new post object
        const newPost = await PostModels_1.default.create({
            PostID: posts.PostID,
            Likes: posts.Likes || 0,
            Caption: posts.Caption,
            Tags: posts.Tags,
            ImageURL: posts.ImageURL || null,
            Location: posts.Location || null,
            CreatedAt: new Date(),
            UpdatedAt: new Date()
        });
        return newPost;
    }
    catch (error) {
        console.error('Error creating post:', error);
        return null;
    }
};
exports.savePostToDatabase = savePostToDatabase;
//# sourceMappingURL=NewPostController.js.map