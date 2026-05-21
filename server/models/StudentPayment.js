const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const StudentPayment = sequelize.define(
  "StudentPayment",
  {

    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    classId: {
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

    tuitionFee: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    saturdayLesson: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    scratchCard: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    termlyActivities: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    books: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    schoolBus: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    outstanding: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    graduation: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    excursion: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    practicals: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    }

  }
);

module.exports = StudentPayment;