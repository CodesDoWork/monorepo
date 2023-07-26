import { Sequelize } from "sequelize";
import { env } from "../app/env";
import * as pg from "pg";

export const sequelize = new Sequelize(
    `postgres://${env.PG_USER}:${env.PG_PASSWORD}@${env.PG_HOST}:${env.PG_PORT}/${env.DB_NAME}`,
    {
        dialectModule: pg,
    },
);
