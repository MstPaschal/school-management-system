const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Subject = sequelize.define("Subject", {

  subjectName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }

});

module.exports = Subject;