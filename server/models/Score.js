const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Score = sequelize.define("Score", {

  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  classId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  sessionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  term: {
    type: DataTypes.ENUM(
      "1st Term",
      "2nd Term",
      "3rd Term"
    ),
    allowNull: false,
  },

  firstCA: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  secondCA: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  project: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  exam: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  total: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }

});

module.exports = Score;