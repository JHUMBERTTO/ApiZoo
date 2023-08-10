import Sequelize  from "sequelize";

export const sequelize = new Sequelize(
  "zoo_sql", // DB NAME
  "postgres", // USER NAME
  "1234", // PASSWORD
  {
    host:"localhost", // SERVER
    port:"5432", // PORT
    dialect: "postgres", // DIALECT
  }
);
