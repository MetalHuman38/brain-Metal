import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { createSequelizeInstance } from './sequelizeCon';
import Users from './UserModel';

interface StoryAttributes {
  StoryID: number;
  UserID: number;
  ImageURL: string;
}

interface StoryCreationAttributes extends Optional<StoryAttributes, 'StoryID'> {}

// Define Instance of Sequelize
const sequelize = createSequelizeInstance();

class Story extends Model<StoryAttributes, StoryCreationAttributes> implements StoryAttributes {
    public StoryID!: number;
    public UserID!: number;
    public ImageURL!: string;
    
    // Create custom class methods to create a new post
    static async createPost(attributes: StoryCreationAttributes): Promise<Story> {
        return await this.create(attributes);
    }

}

// Define the User model
Story.init(
    {
        StoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        UserID: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            
        ImageURL: {
                type: DataTypes.STRING,
                allowNull: true,
        }
    }, // Add a closing curly brace here
    {
        sequelize,
        modelName: 'stories',
        tableName: 'Story',
        timestamps: false
    }
);

Story.belongsTo(Users, { foreignKey: 'UserID', as: 'user' });

export default Story;