const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const AcademicWeek = sequelize.define("AcademicWeek", {

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

  weekNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

});

module.exports = AcademicWeek;