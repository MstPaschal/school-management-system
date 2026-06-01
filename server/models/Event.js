const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/db");

const Event =
  sequelize.define(
    "Event",
    {

      title: {
        type:
          DataTypes.STRING,
        allowNull: false
      },

      description: {
        type:
          DataTypes.TEXT,
        allowNull: false
      },

      content: {
        type:
          DataTypes.TEXT(
            "long"
          ),
        allowNull: false
      },

      eventDate: {
        type:
          DataTypes.DATEONLY,
        allowNull: false
      },

      images: {
        type:
          DataTypes.JSON,
        allowNull: true
      }

    }
  );

module.exports =
  Event;