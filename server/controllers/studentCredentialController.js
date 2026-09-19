const Student = require("../models/Student");
const User = require("../models/user");

const {
  decryptCredential
} = require("../utils/credentialEncryption");


// ==================================================
// GET STUDENTS WITH PORTAL ACCOUNTS BY CLASS
// ==================================================

exports.getStudentCredentialsByClass =
  async (req, res) => {

    try {

      const { classId } =
        req.params;


      const students =
        await Student.findAll({

          where: {
            currentClass: classId,
            status: "ACTIVE"
          },

          include: [

            {
              model: User,

              attributes: [
                "id",
                "username"
              ]

            }

          ],

          order: [
            ["fullName", "ASC"]
          ]

        });


      const result =
        students.map((student) => ({

          id: student.id,

          fullName:
            student.fullName,

          regNumber:
            student.regNumber,

          username:
            student.User?.username || null,

          hasPortalAccount:
            Boolean(student.userId)

        }));


      res.status(200).json(result);


    } catch (error) {

      console.log(
        "GET STUDENT CREDENTIALS ERROR:",
        error
      );

      res.status(500).json({

        message:
          "Failed to load student credentials"

      });

    }

  };



// ==================================================
// GET ONE STUDENT'S CREDENTIAL
// ==================================================

exports.getStudentCredential =
  async (req, res) => {

    try {

      const { studentId } =
        req.params;


      const student =
        await Student.findByPk(

          studentId,

          {

            include: [

              {

                model: User,

                attributes: [
                  "id",
                  "username",
                  "portalCredential"
                ]

              }

            ]

          }

        );


      if (!student) {

        return res.status(404).json({

          message:
            "Student not found"

        });

      }


      if (!student.userId || !student.User) {

        return res.status(404).json({

          message:
            "This student does not have a portal account"

        });

      }


      if (!student.User.portalCredential) {

        return res.status(404).json({

          message:
            "Portal credential is not available"

        });

      }


      const password =
        decryptCredential(
          student.User.portalCredential
        );


      res.status(200).json({

        studentId:
          student.id,

        fullName:
          student.fullName,

        regNumber:
          student.regNumber,

        username:
          student.User.username,

        password

      });


    } catch (error) {

      console.log(
        "GET STUDENT CREDENTIAL ERROR:",
        error
      );

      res.status(500).json({

        message:
          "Failed to retrieve student credential"

      });

    }

  };