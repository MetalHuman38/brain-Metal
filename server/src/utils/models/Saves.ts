import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';

interface SavesAttributes {
  SaveID: number;
  UserID: number | null;
  PostID: number | null;
  SaveDate: string;
}

interface SavesCreationAttributes extends Optional<SavesAttributes, 'SaveID'> {}
// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Saves extends Model<SavesAttributes, SavesCreationAttributes> implements SavesAttributes {
  public SaveID!: number;
  public UserID!: number | null;
  public PostID!: number | null;
  public SaveDate!: string;

  // Create custom class methods to create a new post
  static async createSave(attributes: SavesCreationAttributes): Promise<Saves> {
    return await this.create(attributes);
  }

}

// Define the Saves model
Saves.init(
  {
    SaveID: {
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
    SaveDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Saves',
  }
);

export default Saves;