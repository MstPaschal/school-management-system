const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/db");

const ResultPin =
  sequelize.define(
    "ResultPin",
    {

      pin: {

        type:
          DataTypes.STRING,

        allowNull:
          false,

        unique:
          true

      },

      sessionId: {

        type:
          DataTypes.INTEGER,

        allowNull:
          false

      },

      term: {

        type:
          DataTypes.ENUM(

            "1st Term",

            "2nd Term",

            "3rd Term"

          ),

        allowNull:
          false

      },

      usedByStudentId: {

        type:
          DataTypes.INTEGER,

        allowNull:
          true

      },

      usageCount: {

        type:
          DataTypes.INTEGER,

        defaultValue:
          0

      },

      maxUsage: {

        type:
          DataTypes.INTEGER,

        defaultValue:
          1

      },

      isUsed: {

        type:
          DataTypes.BOOLEAN,

        defaultValue:
          false

      },

      expiresAt: {

        type:
          DataTypes.DATE,

        allowNull:
          true

      }

    }
  );

module.exports =
  ResultPin;