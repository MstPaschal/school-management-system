const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Teacher = sequelize.define("Teacher", {

  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  regNumber: {
    type: DataTypes.STRING,
    unique: true,
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  dob: {
    type: DataTypes.DATEONLY,
  },

  contact: {
    type: DataTypes.STRING,
  },

  address: {
    type: DataTypes.TEXT,
  },

  nextOfKin: {
    type: DataTypes.STRING,
  },

  nokContact: {
    type: DataTypes.STRING,
  },

  nokAddress: {
    type: DataTypes.TEXT,
  },

  passport: {
    type: DataTypes.STRING,
  },

  assignedClass: {
    type: DataTypes.STRING,
  }

});

module.exports = Teacher;