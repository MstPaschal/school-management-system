const {
  DataTypes
} = require("sequelize");

const sequelize =
  require("../config/db");


const StudentResultAccess =
  sequelize.define(
    "StudentResultAccess",
    {

      studentId: {

        type:
          DataTypes.INTEGER,

        allowNull:
          false

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


      classId: {

        type:
          DataTypes.INTEGER,

        allowNull:
          false

      },


      releasedAt: {

        type:
          DataTypes.DATE,

        allowNull:
          false,

        defaultValue:
          DataTypes.NOW

      },


      releaseMethod: {

        type:
          DataTypes.STRING,

        allowNull:
          false,

        defaultValue:
          "RESULT_PIN"

      }

    },

    {

      indexes: [

        {

          unique:
            true,

          fields: [
            "studentId",
            "sessionId",
            "term"
          ],

          name:
            "unique_student_result_access"

        }

      ]

    }

  );


module.exports =
  StudentResultAccess;