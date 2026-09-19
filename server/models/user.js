const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  role: {
    type: DataTypes.ENUM(
      "superadmin",
      "admin",
      "teacher",
      "student"
    ),
    allowNull: false,
    defaultValue: "teacher"
  },

  // Encrypted copy of the student's portal password.
  // Used only when an authorized admin needs to view
  // the student's portal credential.
  portalCredential: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  resetToken: {
    type: DataTypes.STRING,
    allowNull: true
  },

  resetTokenExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = User;