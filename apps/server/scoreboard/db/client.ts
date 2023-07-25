import { DataTypes, Sequelize } from "sequelize";
import { env } from "../app/env";

export const sequelize = new Sequelize(
    `postgres://${env.PG_USER}:${env.PG_PASSWORD}@${env.PG_HOST}:${env.PG_PORT}/${env.DB_NAME}`,
);

export const User = sequelize.define("User", {
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

sequelize.authenticate().then(() => sequelize.sync({ force: true }));
