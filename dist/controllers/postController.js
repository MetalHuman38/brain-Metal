"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getRecentPosts = exports.SavePostToDatabase = exports.createPost = void 0;
const PostModels_1 = __importDefault(require("../utils/models/PostModels"));
const ImageUtils_1 = require("../utils/ImageUtils");
const NewPostModel_1 = __importDefault(require("../utils/models/NewPostModel"));
// Create a new post
const createPost = async (req, res) => {
    try {
        const post = req.body;
        const imageFile = req.file;
        let ImageURL = null;
        if (imageFile) {
            const imageDirectory = '/public/assests/images';
            const imageURL = await (0, ImageUtils_1.saveImageAndUrlToDatabase)(imageFile.path, imageDirectory);
            ImageURL = imageURL;
        }
        const Newpost = await NewPostModel_1.default.createPost({
            CreatorID: post.CreatorID || null,
            Caption: post.Caption,
            File: [],
            Location: post.Location || null,
            Tags: Array.isArray(post.Tags) ? post.Tags.join(',') : '',
            CreatedAt: new Date()
        });
        if (!Newpost) {
            res.status(400).json({ message: 'Error creating user account.' });
            return;
        }
        // Create a new post object
        const newPost = await PostModels_1.default.create({
            PostID: Newpost.PostID,
            CreatorID: post.CreatorID || null,
            Likes: 0,
            Caption: post.Caption,
            Tags: Array.isArray(post.Tags) ? post.Tags.join(',') : '',
            ImageURL: ImageURL,
            Location: post.Location || null,
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
        // Delete the file if an error occurs
        if (req.file) {
            await (0, ImageUtils_1.deleteFile)(req.file.path);
        }
    }
};
exports.createPost = createPost;
// Function to save user post data to the database
async function SavePostToDatabase(post) {
    try {
        // Create a new post object
        const newPost = await PostModels_1.default.create({
            PostID: post.PostID,
            CreatorID: post.CreatorID || null,
            Likes: post.Likes || null,
            Caption: post.Caption,
            Tags: post.Tags,
            ImageURL: post.ImageURL || null,
            Location: post.Location || null,
            CreatedAt: post.CreatedAt,
            UpdatedAt: post.UpdatedAt,
        });
        return newPost;
    }
    catch (error) {
        console.error('Error creating post:', error);
        return null;
    }
}
exports.SavePostToDatabase = SavePostToDatabase;
// Get Recent Posts
const getRecentPosts = async (req, res) => {
    try {
        const posts = await PostModels_1.default.findAll();
        res.status(200).json(posts);
    }
    catch (error) {
        console.error('Error fetching recent posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getRecentPosts = getRecentPosts;
// Get post by ID
const getPostById = async (req, res) => {
    const { PostID } = req.params;
    try {
        const post = await PostModels_1.default.findByPk(PostID);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(post);
    }
    catch (error) {
        console.error('Error fetching post by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getPostById = getPostById;
// Update post by ID
const updatePostById = async (req, res) => {
    const { PostID } = req.params;
    try {
        const post = await PostModels_1.default.findByPk(PostID);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        const { Caption, Tags, ImageURL, Location } = req.body;
        await post.update({ Caption, Tags, ImageURL, Location });
        res.status(200).json({ message: 'Post updated successfully' });
    }
    catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updatePostById = updatePostById;
// Delete post by ID
const deletePostById = async (req, res) => {
    const { PostID } = req.params;
    try {
        const post = await PostModels_1.default.findByPk(PostID);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        await post.destroy();
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deletePostById = deletePostById;
//# sourceMappingURL=postController.js.map