"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getRecentPosts = void 0;
const PostModels_1 = __importDefault(require("../utils/models/PostModels"));
const dbConfig_1 = require("../utils/dbConfig");
const sequelize_1 = require("sequelize");
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
    try {
        const { PostID } = req.params;
        const { UserID } = req.params;
        if (!UserID) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        // Get the Sequelize instance
        const sequelize = await (0, dbConfig_1.waitForDB)();
        const post = await sequelize.query('SELECT * FROM Posts WHERE PostID = :PostID AND UserID = :UserID', {
            replacements: { PostID, UserID },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!post.length) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).send(post[0]);
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