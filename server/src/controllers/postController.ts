import { Request, Response } from 'express';
import Posts from '../utils/models/PostModels';
import { deleteFile, saveImageAndUrlToDatabase } from '../utils/ImageUtils';
import { INewPost } from '../utils/types';
import NewPosts from '../utils/models/NewPostModel';

// Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {

    const post: INewPost = req.body;

    const imageFile = req.file;
    let ImageURL: string | null = null;
    
    if(imageFile) {

      const imageDirectory = '/public/assests/images';
      const imageURL = await saveImageAndUrlToDatabase(imageFile.path, imageDirectory);
      ImageURL = imageURL;
      
    }

    const Newpost = await NewPosts.createPost({
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
    const newPost = await Posts.create({
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

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });

    // Delete the file if an error occurs
    if (req.file) {
     await deleteFile(req.file.path);
   } 
  }
};

// Function to save user post data to the database
export async function SavePostToDatabase(post: {
  PostID: number;
  CreatorID: number | null;
  Likes: number | null;
  Caption: string;
  Tags: string;
  ImageURL: string | null;
  Location: string | null;
  CreatedAt: Date;
  UpdatedAt: Date;
}) {
  try{
    // Create a new post object
    const newPost = await Posts.create({
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
  }catch(error){
    console.error('Error creating post:', error);
    return null;
  }
}

// Get Recent Posts
export const getRecentPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Posts.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Get post by ID
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  const { PostID } = req.params;
  try {
    const post = await Posts.findByPk(PostID);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update post by ID
export const updatePostById = async (req: Request, res: Response): Promise<void> => {
  const { PostID } = req.params;
  try {
    const post = await Posts.findByPk(PostID);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    const { Caption, Tags, ImageURL, Location } = req.body;
    await post.update({ Caption, Tags, ImageURL, Location });
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete post by ID
export const deletePostById = async (req: Request, res: Response): Promise<void> => {
  const { PostID } = req.params;
  try {
    const post = await Posts.findByPk(PostID);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    await post.destroy();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
