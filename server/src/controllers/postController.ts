import { Request, Response } from 'express';
import Posts from '../utils/models/PostModels';
import dbConfig, { waitForDB } from '../utils/dbConfig';
import { QueryTypes } from 'sequelize';


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
  try {
    
    const { PostID } = req.params;

    const { UserID } = req.params;

    if (!UserID) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Get the Sequelize instance
    const sequelize = await waitForDB();

    const post = await sequelize.query(
      'SELECT * FROM Posts WHERE PostID = :PostID AND UserID = :UserID',
      {
        replacements: { PostID, UserID },
        type: QueryTypes.SELECT,
      }
    );

    if (!post.length) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).send(post[0]);
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
