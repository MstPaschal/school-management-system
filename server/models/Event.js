const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Event = sequelize.define("Event", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  summary: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  content: {
    type: DataTypes.TEXT("long"),
    allowNull: false
  },

  images: {
    type: DataTypes.JSON,
    allowNull: true
  }
});

module.exports = Event;