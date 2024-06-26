import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import 'dotenv/config';
import { createSequelizeInstance } from './sequelizeCon';
import Users from './UserModel';
import bcrypt from 'bcrypt'
import { generateAvatarUrl } from '../avatarUtils';


interface UserAttributes {
  UserID: number;
  NewUser: string | null;
  Username: string;
  Email: string;
  HashedPassword: string;
  Created_at: Date | undefined;
  Updated_at: Date | undefined;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'UserID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class UserRegistrations extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public UserID!: number;
  public NewUser!: string | null;
  public Username!: string;
  public Email!: string;
  public HashedPassword!: string;
  public Created_at: Date | undefined;
  public Updated_at: Date | undefined;


  // Define custom class methods
  static async createUser(name: string, username: string, email: string, password: string): Promise<UserRegistrations> {
    return await this.create({ NewUser: name, Username: username, Email: email, HashedPassword: password });
  }

  // Create a customer class that uses promise to save a new user to user.json file
  static async saveUserToDatabase(user: UserCreationAttributes): Promise<UserRegistrations> {
    return await this.create(user);
  }

  // Create a static method to log in user upon successful registration
  static async loginUser(username: string, password: string): Promise<UserRegistrations | null> {
    return await this.findOne({ where: { Username: username, HashedPassword: password } });
  }

  // Create a static method to find a user by primaryKey
  static async findUserByPk(UserID: number): Promise<UserRegistrations | null> {
    return await this.findByPk(UserID);
  }

  // Create a static method to find a user by email
  static async findUserByEmail(email: string): Promise<UserRegistrations | null> {
    return await this.findOne({ where: { Email: email } });
  }

 // Create a static method to find logged in user by user id sent to payload
  static async findUserById(UserID: number): Promise<UserRegistrations | null> {
    return await this.findByPk(UserID);
  }

}
// Define the User model
UserRegistrations.init(
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    NewUser: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3, 50],
        notEmpty: false,
      }
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        len: [3, 20]
      }
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [5, 50],
        notEmpty: true,
      }
    },
    HashedPassword: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    Created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    
    }
  },
  {
    sequelize: sequelize, 
    tableName: 'UserRegistrations',
    timestamps: true,
    updatedAt: 'Updated_at',
    createdAt: 'Created_at',
  }
);

UserRegistrations.beforeCreate(async (user: UserAttributes) => {
  try {
    if (user) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword: string = await bcrypt.hash(String(user.HashedPassword), salt);
      user.HashedPassword = hashedPassword;
    }
  } catch (error) {
    console.error('Error before creating user:', error);
    throw new Error('Error before creating user');
    // If an error occurs during the pre-processing, you can choose to handle it or throw it
  }
});


UserRegistrations.afterCreate(async (user: UserAttributes) => {
  try {
    if (user) {
      // Find the index of the last space in the NewUser field
      const spaceIndex = user.NewUser?.lastIndexOf(' ');

      // Extract the first name and last name based on the last space
      const firstName = spaceIndex !== -1 ? user.NewUser?.slice(0, spaceIndex) : user.NewUser;
      const lastName = spaceIndex !== -1 ? user.NewUser?.slice(spaceIndex ?? + 1) : null;
      const avatar = generateAvatarUrl(user.Username);

      // Create or update the user record in the Users table
      await Users.upsert({
        UserID: user.UserID,
        FirstName: firstName,
        LastName: lastName,
        Username: user.Username,
        Email: user.Email,
        HashedPassword: user.HashedPassword,
        Status: null,
        Bio: 'I am a new',
        Join: new Date(),
        AvatarUrl: avatar,
        ImageURL: avatar,
        Label: 'New User',
        Last_activity: new Date(),
        Updated_at: new Date(),
      });
    }
  } catch (error) {
    console.error('Error after creating user:', error);
    throw new Error('Error after creating user');
  }
});


// Define a custom class method to log in a user
UserRegistrations.loginUser = async function( email: string, password: string) {
  try{
    const user = await this.findOne({ where: { Email: email}});
  if(user){
    const auth = await bcrypt.compare(password, user.HashedPassword)
    if(auth){
      return user;
    } else{
      throw new Error('Incorrect password')
    }
  } else{
    throw new Error('Incorrect email')
  }

  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('User not found');
  }
}

// Create a user with the returned user from login method
UserRegistrations.findUserByEmail = async function( email: string) {
  try{
    return await this.findOne({ where: { Email: email } });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}


UserRegistrations.findUserByPk = async function(UserID: number) {
  try{
    return await this.findByPk(UserID);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}


// Sync the User model with the database
sequelize.sync()
.then(() => {
  console.log('New registration synced successfully')
}).catch(err => {
  console.error('Error syncing new user:', err)
})
export default UserRegistrations;