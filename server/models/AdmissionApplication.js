const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const AdmissionApplication =
  sequelize.define("AdmissionApplication", {

    studentName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    parentName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    level: {
      type: DataTypes.STRING,
      allowNull: false
    },

    className: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastSchool: {
      type: DataTypes.STRING
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "ACCEPTED",
        "REJECTED"
      ),
      defaultValue: "PENDING"
    },

    examDate: {
      type: DataTypes.DATEONLY
    },

    examTime: {
      type: DataTypes.STRING
    }

  });

module.exports =
  AdmissionApplication;