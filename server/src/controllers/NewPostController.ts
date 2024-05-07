import { Request, Response } from 'express';
import NewPosts from '../utils/models/NewPostModel';
import { INewPost } from '../utils/types';

// Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post: INewPost = req.body;


        const Newpost = await NewPosts.createPost({
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

        res.status(201).json({ message: 'Post created successfully', post: Newpost });

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

