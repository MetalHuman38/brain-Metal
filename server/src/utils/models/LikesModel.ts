import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';
import Users from './UserModel';

interface LikesAttributes {
  LikeID: number;
  UserID: number;
  PostID: number;
}

interface LikesCreationAttributes extends Optional<LikesAttributes, 'LikeID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Likes extends Model<LikesAttributes, LikesCreationAttributes> implements LikesAttributes {
  public LikeID!: number;
  public UserID!: number;
  public PostID!: number;
  
  
  // Create custom class methods to create a new post
  static async createLike(attributes: LikesCreationAttributes): Promise<Likes> {
    return await this.create(attributes);
  }

}

// Define the User model
Likes.init(
  {
    LikeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    PostID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
  },
{
    sequelize,
    modelName: 'likes',
    tableName: 'Likes',
    timestamps: false
}
);

Likes.belongsTo(Users, { foreignKey: 'UserID', as: 'user' });

export default Likes;