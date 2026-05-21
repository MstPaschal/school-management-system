const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Student = sequelize.define("Student", {

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

  gender: {
    type: DataTypes.ENUM("Male", "Female"),
  },

  address: {
    type: DataTypes.TEXT,
  },

  contact1: {
    type: DataTypes.STRING,
  },

  contact2: {
    type: DataTypes.STRING,
  },

  currentClass: {
  type: DataTypes.INTEGER,
  allowNull: false,
},

  passport: {
    type: DataTypes.STRING,
  },

  status: {
    type: DataTypes.ENUM(
      "ACTIVE",
      "INACTIVE",
      "GRADUATED"
    ),
    defaultValue: "ACTIVE",
  }

});

module.exports = Student;