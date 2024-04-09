import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';
import Users from './UserModel';

interface CommentAttributes {
  CommentID: number;
  UserID: number;
  Desc: string | null;
  CreatedAt: Date | undefined;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'CommentID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public CommentID!: number;
  public UserID!: number;
  public Desc!: string;
  public CreatedAt: Date | undefined;
  
  

  // Create custom class methods to create a new comment
  static async createPost(attributes: CommentCreationAttributes): Promise<Comment> {
    return await this.create(attributes);
  }

}

// Define the User model
Comment.init(
  {
    CommentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

    Desc: {
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
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: false
}
);

// Define the relationship between the User and Comment models
// Comment.belongsTo(Users, { foreignKey: 'UserID', as: 'user' });

export default Comment;