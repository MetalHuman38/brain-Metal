import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import 'dotenv/config';
import { createSequelizeInstance } from './sequelizeCon';
import Users from './UserModel';


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
        notEmpty: true,
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
        len: [5, 50]
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

UserRegistrations.hasOne(Users, { foreignKey: 'UserID', as: 'user' });
Users.belongsTo(UserRegistrations, { foreignKey: 'UserID', as: 'registration' });

export default UserRegistrations;