import { Request, Response } from 'express';
import NewPosts from '../utils/models/NewPostModel';
import { INewPost } from '../utils/types';
import Posts from '../utils/models/PostModels';

// Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post: INewPost = req.body;


        const Newpost = await NewPosts.createPost({
            NewPostID: 0,
            Caption: post.caption,
            ImageURL:  req.file ? req.file.path : null,
            Location: post.location || null,
            Tags: post.tags || '',
            CreatedAt: new Date()
        });

        if (!Newpost) {
            res.status(400).json({ message: 'Error creating new post.' });
            return;
        }

        // Create a new post object
        const newPost = await Posts.create({
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

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a post in the database
export const savePostToDatabase = async (posts: {
    PostID: number;
    Likes: number | null;
    Caption: string;
    Tags: string;
    ImageURL: string;
    Location: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}): Promise<any> => {
    try {
        // Create a new post object
        const newPost = await Posts.create({
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
    } catch (error) {
        console.error('Error creating post:', error);
        return null;
    }
};

