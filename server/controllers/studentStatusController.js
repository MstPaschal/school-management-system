const Student = require("../models/Student");



// =========================
// LOAD STUDENT STATUS
// =========================
exports.loadStudentStatus =
  async (req, res) => {

    try {

      const {
        classId
      } = req.query;


      const students =
        await Student.findAll({

          where: {
            currentClass: classId
          },

          order: [["fullName", "ASC"]]

        });


      res.status(200).json(
        students
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };



// =========================
// ACTIVATE / DEACTIVATE
// =========================
exports.changeStudentStatus =
  async (req, res) => {

    try {

      const {
        studentId
      } = req.params;


      const student =
        await Student.findByPk(
          studentId
        );


      if (!student) {

        return res.status(404).json({
          message:
            "Student not found"
        });

      }


      // TOGGLE STATUS
      if (
        student.status ===
        "ACTIVE"
      ) {

        student.status =
          "INACTIVE";

      } else {

        student.status =
          "ACTIVE";

      }


      await student.save();


      res.status(200).json({

        message:
          `Student is now ${student.status}`,

        student

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };