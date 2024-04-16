import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';
import Posts from './PostModels';
import Comment from './CommentsModel';
import NewPosts from './NewPostModel';

interface UserAttributes {
  UserID: number;
  MemberName: string | null;
  Username: string;
  Email: string;
  HashedPassword: string;
  Bio: string | null;
  Status: string | null;
  Join : Date | undefined;
  AvatarUrl: string | null;
  ImageURL: string | null;
  Label: string | null;
  Last_activity: Date | undefined;  
  Updated_at: Date | undefined;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'UserID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public UserID!: number;
  public MemberName!: string | null;
  public Username!: string;
  public Email!: string;    
  public HashedPassword!: string;
  public Status!: string | null;
  public Bio!: string | null;
  public Join!: Date | undefined;
  public AvatarUrl!: string | null;
  public ImageURL!: string | null;
  public Label!: string | null;
  public Last_activity!: Date | undefined;
  public Updated_at: Date | undefined;
  

  static async createUser(userData: UserCreationAttributes): Promise<Users> {
    return await this.create(userData);
  }

  static async findByEmail(email: string): Promise<Users | null> {
    return await this.findOne({ where: { Email: email } });
  }

  static async findByUserId(UserID: string): Promise<Users | null> {
    return await this.findByPk(UserID);
  }

}

// Define the User model
Users.init(
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    MemberName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    HashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status : {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    Bio: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    Join: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    
    Label: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    Last_activity: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },

    Updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    ImageURL: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    AvatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    updatedAt: 'Updated_at',
    createdAt: 'Join',

    timestamps: false
  }
);

// Define associations
Users.hasMany(Posts, { foreignKey: 'PostID', as: 'post' });
Users.hasMany(Comment, { foreignKey:  'UserID', as: 'comments'});
Posts.belongsTo(Users, { foreignKey:  'PostID', as: 'creator'});

export default Users;