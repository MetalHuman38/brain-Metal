import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';
import Posts from './PostModels';
import Comment from './CommentsModel';
import UserRegistrations from './UserRegistrationModel';


interface UserAttributes {
  UserID: number;
  FirstName: string | null;
  LastName: string | null;
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
  public FirstName!: string | null;
  public LastName!: string | null;
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

  // Create custom class method to find Image URL
  static async findImageURL(ImageURL: string): Promise<Users | null> {
    return await this.findOne({ where: { ImageURL: ImageURL } });
  }

  // Create custom class method to detect duplicate username
  static async findUsername(Username: string): Promise<Users | null> {
    return await this.findOne({ where: { Username: Username } });
  }

  // Static method to provide userRegistration attributes
  static async findUserRegistration(UserID: number): Promise<UserRegistrations | null> {
    return await UserRegistrations.findByPk(UserID);
  }

  // Static method to find user by primary key
  static async findUser(UserID: number): Promise<Users | null> {
    return await Users.findOne({ where: { UserID: UserID } });
  }

  // Static method to find user by primary key
  static async findByPk(UserID: number): Promise<Users | null> {
    return await Users.findOne({ where: { UserID: UserID } });
  }

  static async currentUser(UserID: number): Promise<Users | null> {
    try{
      return await Users.findOne({ where: { UserID: UserID } });
    }
    catch(error){
      console.error('Error fetching user by ID:', error);
      throw error;
    }
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
    FirstName: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
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


  


Users.afterCreate(async (user, options) => {
  try {
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
});

Users.currentUser = async function (UserID: number) {
  try {
    const user = await Users.findOne({ where: { UserID } });
    console.log('User:', user); // Log the user object
    return user; // Return the user object if found
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}


Users.hasMany(Comment, { foreignKey:  'UserID', as: 'comments'});
Posts.belongsTo(Users, { foreignKey:  'PostID', as: 'creator'});

export default Users;