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

<<<<<<< HEAD
class newposts extends Model<NewPostAttributes, NewPostCreationAttributes> implements NewPostAttributes {
  public NewPostID!: number;
  public Caption!: string;
  public ImageURL!: string | null;   
  public Tags!: string;
=======
class NewPosts extends Model<NewPostAttributes, NewPostCreationAttributes> implements NewPostAttributes {
  public NewPostID!: number;
  public Caption!: string;
  public ImageURL!: string | null;
>>>>>>> 58fd192 (FileUpload-Complete)
  public Location!: string | null;
  public Tags!: string;
  public CreatedAt: Date | undefined;

  
  // Create custom class methods to create a new post
  static async createPost(attributes: NewPostCreationAttributes): Promise<newposts> {
    return await this.create(attributes);
  }

}

// Define the User model
newposts.init(
  {
    NewPostID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
<<<<<<< HEAD
=======
    
>>>>>>> 58fd192 (FileUpload-Complete)
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
    tableName: 'newposts',
    createdAt: 'CreatedAt',
    timestamps: false
}
);

// Create foreign key relationship
<<<<<<< HEAD
newposts.belongsTo(Users, {
  foreignKey: 'NewPostID',
  targetKey: 'UserID',
  as: 'creator'
});
=======
NewPosts.belongsTo(Users, {foreignKey: 'NewPostID', 
                           targetKey: 'UserID',
                           as: 'creator'});
>>>>>>> 58fd192 (FileUpload-Complete)


export default newposts;