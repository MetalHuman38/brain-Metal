import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';

interface AuthenticationAttributes {
  UserID: number;
  hashedPassword: string;
}

interface AuthenticationCreationAttributes extends Optional<AuthenticationAttributes, 'UserID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Authentication extends Model<AuthenticationAttributes, AuthenticationCreationAttributes> implements AuthenticationAttributes {
  public UserID!: number;
  public hashedPassword!: string;

  // Timestamps will be automatically created by Sequelize unless disabled
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

    // Create custom class methods to create a new post
    static async createAuthentication(attributes: AuthenticationCreationAttributes): Promise<Authentication> {
      return await this.create(attributes);
    }
}

Authentication.init(
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'Authentication', // Set the model name
    tableName: 'Authentication', // Set the table name
  }
);

export default Authentication;
