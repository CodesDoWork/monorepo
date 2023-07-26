import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "./client";

export interface UserModel
    extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    email: string;
    username: string;
    notionApiKey: string | null;
    selectedDB: string | null;
}

export const User = sequelize.define<UserModel>("User", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notionApiKey: DataTypes.STRING,
    selectedDB: DataTypes.STRING,
});
