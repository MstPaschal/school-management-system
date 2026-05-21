const Student = require("../models/Student");

const Score = require("../models/Score");



// =========================
// LOAD STUDENTS FOR PROMOTION
// =========================
exports.loadStudentsForPromotion =
  async (req, res) => {

    try {

      const {
        classId,
        sessionId
      } = req.query;


      const students =
        await Student.findAll({

          where: {
            currentClass: classId,
            status: "ACTIVE"
          },

          order: [["fullName", "ASC"]]

        });


      const result = [];


      for (const student of students) {

        // GET ALL SCORES
        const scores =
          await Score.findAll({

            where: {
              studentId: student.id,
              sessionId
            }

          });


        let total = 0;

        let count = 0;


        for (const score of scores) {

          total += score.total;

          count++;

        }


        const cumulativeAverage =

          count > 0

            ? Number(
                (
                  total / count
                ).toFixed(2)
              )

            : 0;


        result.push({

          student,

          cumulativeAverage

        });

      }


      res.status(200).json(result);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };



// =========================
// PROMOTE STUDENTS
// =========================
exports.promoteStudents =
  async (req, res) => {

    try {

      const {

        studentIds,

        newClassId

      } = req.body;


      for (const studentId of studentIds) {

        const student =
          await Student.findByPk(
            studentId
          );

        if (!student) continue;


        // GRADUATE
        if (
          newClassId ===
          "GRADUATED"
        ) {

          student.status =
            "GRADUATED";

        }

        // PROMOTE
        else {

          student.currentClass =
            newClassId;

        }


        await student.save();

      }


      res.status(200).json({
        message:
          "Students promoted successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };