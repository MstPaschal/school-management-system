const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const StudentComment = sequelize.define(
  "StudentComment",
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

    teacherComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    proprietorComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    }

  }
);

module.exports = StudentComment;