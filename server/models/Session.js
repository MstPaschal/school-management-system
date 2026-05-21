const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Session = sequelize.define("Session", {

  sessionName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }

});

module.exports = Session;