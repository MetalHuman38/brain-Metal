import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';
import Users from './UserModel';

interface NewPostAttributes {
  PostID: number;
  CreatorID: number | null;
  ImageURL: string | null;
  Caption: string;
  Tags: string;
  Location: string | null;
  CreatedAt: Date | undefined;
}

interface NewPostCreationAttributes extends Optional<NewPostAttributes, 'PostID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class NewPosts extends Model<NewPostAttributes, NewPostCreationAttributes> implements NewPostAttributes {
  public PostID!: number;
  public CreatorID!: number | null;
  public Caption!: string;
  public ImageURL!: string | null;   
  public Tags!: string;
  public Location!: string | null;
  public CreatedAt: Date | undefined;

  
  // Create custom class methods to create a new post
  static async createPost(attributes: NewPostCreationAttributes): Promise<NewPosts> {
    return await this.create(attributes);
  }

}

// Define the User model
NewPosts.init(
  {
    PostID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    CreatorID: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
        allowNull: false,
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
NewPosts.belongsTo(Users, {
  foreignKey: 'CreatorID',
  targetKey: 'UserID',
  as: 'creator'
});


export default NewPosts;