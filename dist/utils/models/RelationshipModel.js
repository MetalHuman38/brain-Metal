"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeCon_1 = require("./sequelizeCon");
const UserModel_1 = __importDefault(require("./UserModel"));
// Define Instance of Sequelize
const sequelize = (0, sequelizeCon_1.createSequelizeInstance)();
class Relationship extends sequelize_1.Model {
    static async createRelationship(attributes) {
        return await this.create(attributes);
    }
}
// Define the User model
Relationship.init({
    RelationshipID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Follows: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'relationships',
    tableName: 'Relationship',
    timestamps: false
});
// Define associations
Relationship.belongsTo(UserModel_1.default, { foreignKey: 'UserID', as: 'user' }); // Relationship belongs to a user
Relationship.belongsTo(UserModel_1.default, { foreignKey: 'Follows', as: 'followedUser' }); // Relationship belongs to a followed user
exports.default = Relationship;
//# sourceMappingURL=RelationshipModel.js.map