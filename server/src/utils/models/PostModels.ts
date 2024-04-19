import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';

interface PostAttributes {
  PostID: number;
  Likes: number | null;
  Caption: string;
  Tags: string;
  ImageURL: string | null;
  Location: string | null;
  CreatedAt: Date | undefined;
  UpdatedAt: Date | undefined;
  
}

interface PostCreationAttributes extends Optional<PostAttributes, 'PostID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Posts extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public PostID!: number;
  public Likes!: number | null;
  public Caption!: string;    
  public Tags!: string;
  public ImageURL!: string | null;
  public Location!: string | null;
  public CreatedAt: Date | undefined;
  public UpdatedAt: Date | undefined;

  static async findUserPost(PostID: number): Promise<Posts | null> {
    return await this.findByPk(PostID);
  }

  static async findAllUserPosts(PostID: number): Promise<Posts[]> {
    return await this.findAll({
      where: {
        PostID: PostID
      },
    });
  }
}

// Define the User model
Posts.init(
  {
    PostID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
      Likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      Caption: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Tags: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      ImageURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Location: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      
      UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
{
    sequelize,
    tableName: 'Posts',
    updatedAt: 'UpdatedAt',
    createdAt: 'CreatedAt',
    timestamps: false
}
);


export default Posts;