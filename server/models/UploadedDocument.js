const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/db");



const UploadedDocument =
  sequelize.define(
    "UploadedDocument",
    {

      classId: {

        type: DataTypes.INTEGER,

        allowNull: false

      },

      sessionId: {

        type: DataTypes.INTEGER,

        allowNull: false

      },

      term: {

        type: DataTypes.ENUM(

          "1st Term",

          "2nd Term",

          "3rd Term"

        ),

        allowNull: false

      },

      fileName: {

        type: DataTypes.STRING,

        allowNull: false

      },

      originalName: {

        type: DataTypes.STRING,

        allowNull: false

      }

    }
  );

module.exports =
  UploadedDocument;