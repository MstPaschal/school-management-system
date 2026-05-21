const { DataTypes } = require("sequelize");

const sequelize =
  require("../config/db");

const AdminSetting =
  sequelize.define(
    "AdminSetting",
    {

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

      // =========================
      // RESUMPTION
      // =========================
      nextTermResumes: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      // =========================
      // GLOBAL FEES
      // =========================
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
      }

    },

    {
      indexes: [

        {
          unique: true,

          fields: [
            "classId",
            "sessionId",
            "term"
          ]

        }

      ]
    }

  );

module.exports =
  AdminSetting;