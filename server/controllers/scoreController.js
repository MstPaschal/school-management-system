const Score = require("../models/Score");

const Student = require("../models/Student");

const Teacher =
  require("../models/Teacher");

const User =
  require("../models/User");

const Class =
  require("../models/Class");


// BULK SAVE SCORES
exports.saveScore = async (req, res) => {

  try {

    const { scores } = req.body;

    for (const item of scores) {

      const {

        studentId,

        classId,

        subjectId,

        sessionId,

        term,

        firstCA,

        secondCA,

        project,

        exam

      } = item;


      const total =

        Number(firstCA || 0) +

        Number(secondCA || 0) +

        Number(project || 0) +

        Number(exam || 0);


      // CHECK EXISTING
      const existingScore =
        await Score.findOne({

          where: {

            studentId,

            classId,

            subjectId,

            sessionId,

            term

          }

        });


      // UPDATE
      if (existingScore) {

        existingScore.firstCA =
          firstCA;

        existingScore.secondCA =
          secondCA;

        existingScore.project =
          project;

        existingScore.exam =
          exam;

        existingScore.total =
          total;

        await existingScore.save();

      }

      // CREATE
      else {

        await Score.create({

          studentId,

          classId,

          subjectId,

          sessionId,

          term,

          firstCA,

          secondCA,

          project,

          exam,

          total

        });

      }

    }


    res.status(200).json({

      message:
        "Scores saved successfully"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};



// LOAD STUDENTS + EXISTING SCORES
exports.loadScoreSheet = async (req, res) => {

  try {

    let {
      classId,
      subjectId,
      sessionId,
      term
    } = req.query;


    // =========================
    // TEACHER SECURITY
    // =========================
    if (req.user.role === "teacher") {

      const teacher =
        await Teacher.findOne({

          where: {
            userId: req.user.id
          }

        });

      if (!teacher) {

        return res.status(404).json({
          message: "Teacher not found"
        });

      }

      // FORCE ASSIGNED CLASS
      classId =
        teacher.assignedClass;

    }


    // GET STUDENTS
    const students =
      await Student.findAll({

        where: {

          currentClass:
            classId,

          status:
            "ACTIVE"

        },

        order: [
          ["fullName", "ASC"]
        ]

      });


    const result = [];


    for (const student of students) {

      const existingScore =
        await Score.findOne({

          where: {

            studentId:
              student.id,

            classId,

            subjectId,

            sessionId,

            term

          }

        });


      result.push({

        student,

        score:
          existingScore || null

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