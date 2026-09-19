const Student = require("../models/Student");


// ==================================================
// GET AUTHENTICATED STUDENT PROFILE
// ==================================================

exports.getMyStudentProfile =
  async (req, res) => {

    try {

      // ------------------------------------------
      // MAKE SURE A USER IS AUTHENTICATED
      // ------------------------------------------

      if (!req.user || !req.user.id) {

        return res.status(401).json({

          message:
            "Authentication required"

        });

      }


      // ------------------------------------------
      // ONLY STUDENTS CAN ACCESS THIS ENDPOINT
      // ------------------------------------------

      if (req.user.role !== "student") {

        return res.status(403).json({

          message:
            "Student access required"

        });

      }


      // ------------------------------------------
      // FIND STUDENT USING JWT USER ID
      // ------------------------------------------

      const student =
        await Student.findOne({

          where: {

            userId:
              req.user.id

          }

        });


      // ------------------------------------------
      // STUDENT ACCOUNT MUST EXIST
      // ------------------------------------------

      if (!student) {

        return res.status(404).json({

          message:
            "Student profile not found"

        });

      }


      // ------------------------------------------
      // RETURN ONLY WHAT THE PORTAL NEEDS
      // ------------------------------------------

      return res.status(200).json({

        id:
          student.id,

        fullName:
          student.fullName,

        regNumber:
          student.regNumber,

        admissionNumber:
          student.admissionNumber,

        currentClass:
          student.currentClass,

        gender:
          student.gender,

        dob:
          student.dob,

        passport:
          student.passport,

        status:
          student.status

      });

    } catch (error) {

      console.log(
        "GET MY STUDENT PROFILE ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to load student profile"

      });

    }

  };