const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "grisfield_school",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;