import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';
import Users from './UserModel';

interface NewPostAttributes {
  NewPostID: number;
  Caption: string;
  ImageURL: string | null;
  Location: string | null;
  Tags: string;
  CreatedAt: Date | undefined;
}

interface NewPostCreationAttributes extends Optional<NewPostAttributes, 'NewPostID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class NewPosts extends Model<NewPostAttributes, NewPostCreationAttributes> implements NewPostAttributes {
  public NewPostID!: number;
  public Caption!: string;
  public ImageURL!: string | null;
  public Location!: string | null;
  public Tags!: string;
  public CreatedAt: Date | undefined;

  
  // Create custom class methods to create a new post
  static async createPost(attributes: NewPostCreationAttributes): Promise<NewPosts> {
    return await this.create(attributes);
  }

  // Create custom class to Update ImageURL column in NewPost Table
  static async updateImageURL(NewPostID: number, ImageURL: string): Promise<NewPosts | null> {
    const post = await this.findByPk(NewPostID);
    if (post) {
      post.ImageURL = ImageURL;
      await post.save();
    }
    return post;
  }

  // Create Static method to fetch all new posts by ID
  static async getNewPostByID(NewPostID: number): Promise<NewPosts | null> {
    return await this.findByPk(NewPostID);
  }

}

// Define the User model
NewPosts.init(
  {
    NewPostID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    
      Caption: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      ImageURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Tags: {
        type: DataTypes.TEXT,
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
    },
{
    sequelize,
    tableName: 'NewPosts',
    createdAt: 'CreatedAt',
    timestamps: false
}
);

// Create foreign key relationship
NewPosts.belongsTo(Users, {foreignKey: 'NewPostID', 
                           targetKey: 'UserID',
                           as: 'creator'});


export default NewPosts;