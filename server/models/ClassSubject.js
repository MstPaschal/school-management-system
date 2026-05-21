const { DataTypes } =
require("sequelize");

const sequelize =
require("../config/db");

const Subject =
require("./Subject");

const Class =
require("./Class");


const ClassSubject =
sequelize.define(

  "ClassSubject",

  {

    id: {

      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true

    },

    classId: {

      type: DataTypes.INTEGER,

      allowNull: false

    },

    subjectId: {

      type: DataTypes.INTEGER,

      allowNull: false

    }

  }

);


// RELATIONSHIPS
ClassSubject.belongsTo(
  Subject,
  {
    foreignKey: "subjectId"
  }
);

ClassSubject.belongsTo(
  Class,
  {
    foreignKey: "classId"
  }
);

module.exports =
ClassSubject;