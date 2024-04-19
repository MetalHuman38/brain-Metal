import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';
import Users from './UserModel';
import NewPosts from './NewPostModel';

interface ImageStorageAttributes {
  ImageID: number;
  ImageURL: string | null;
  UserID: number;
  NewPostID: number;
  CreatedAt: Date | undefined;
}

interface ImageStorageCreationAttributes extends Optional<ImageStorageAttributes, 'ImageID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class ImageStorage extends Model<ImageStorageAttributes, ImageStorageCreationAttributes> implements ImageStorageAttributes {
  public ImageID!: number;
  public ImageURL!: string;
  public UserID!: number;
  public NewPostID!: number;
  public CreatedAt: Date | undefined;
  
  
  // Create custom class methods to create a new image
  static async createPost(attributes: ImageStorageCreationAttributes): Promise<ImageStorage> {
    return await this.create(attributes);
  }

  // Create custom class methods to fetch an image by its ID
  static async getImageByID(ImageID: number): Promise<ImageStorage | null> {
    return await this.findByPk(ImageID);
  }

  // Create custom class methods to fetch an image by its URL
  static async getImageByURL(ImageURL: string): Promise<ImageStorage | null> {
    return await this.findOne({ where: { ImageURL } });
  }
}

// Define the User model
ImageStorage.init(
  {
    ImageID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ImageURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    NewPostID: {
        type: DataTypes.INTEGER,
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
    modelName: 'ImageStorage',
    tableName: 'ImageStorage',
    timestamps: false
});

// Define the relationship between the User, NewPost, and ImageStorage models
ImageStorage.belongsTo(Users, { foreignKey: 'UserID' });
ImageStorage.belongsTo(NewPosts, { foreignKey: 'NewPostID' });


export default ImageStorage;