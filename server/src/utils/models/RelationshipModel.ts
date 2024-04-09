import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';
import Users from './UserModel';

interface RelationshipAttributes {
  RelationshipID: number;
  UserID: number;
  Follows: number;
}

interface RelationshipCreationAttributes extends Optional<RelationshipAttributes, 'RelationshipID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Relationship extends Model<RelationshipAttributes, RelationshipCreationAttributes> implements RelationshipAttributes {
  public RelationshipID!: number;
  public UserID!: number;
  public Follows!: number;
  

  static async createRelationship(attributes: RelationshipCreationAttributes): Promise<Relationship> {
    return await this.create(attributes);
  }

}

// Define the User model
Relationship.init(
  {
    RelationshipID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

    Follows: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
  },
{
    sequelize,
    modelName: 'relationships',
    tableName: 'Relationship',
    timestamps: false
  }
);

// Define associations
Relationship.belongsTo(Users, { foreignKey: 'UserID', as: 'user' }); // Relationship belongs to a user
Relationship.belongsTo(Users, { foreignKey: 'Follows', as: 'followedUser' }); // Relationship belongs to a followed user

export default Relationship;