const CommentTemplate = require(
  "../models/CommentTemplate"
);

const StudentComment = require(
  "../models/StudentComment"
);

const Student = require("../models/Student");

const Score = require("../models/Score");


// =========================
// ADD COMMENT TEMPLATE
// =========================
exports.addTemplate = async (
  req,
  res
) => {

  try {

    const { comment } = req.body;

    await CommentTemplate.create({
      comment
    });

    res.status(201).json({
      message: "Comment added successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



// =========================
// GET COMMENT TEMPLATES
// =========================
exports.getTemplates = async (
  req,
  res
) => {

  try {

    const comments =
      await CommentTemplate.findAll({

        order: [["id", "DESC"]]

      });

    res.status(200).json(comments);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



// =========================
// SAVE STUDENT COMMENT
// =========================
exports.saveStudentComment =
  async (req, res) => {

    try {

      const {
        studentId,
        classId,
        sessionId,
        term,
        teacherComment,
        proprietorComment
      } = req.body;


      const existing =
        await StudentComment.findOne({

          where: {
            studentId,
            classId,
            sessionId,
            term
          }

        });


      // UPDATE EXISTING
      if (existing) {

        existing.teacherComment =
          teacherComment;

        existing.proprietorComment =
          proprietorComment;

        await existing.save();

        return res.status(200).json({
          message:
            "Comment updated successfully"
        });

      }


      // CREATE NEW
      await StudentComment.create({

        studentId,

        classId,

        sessionId,

        term,

        teacherComment,

        proprietorComment

      });


      res.status(201).json({
        message:
          "Comment saved successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };



// =========================
// LOAD COMMENT PAGE
// =========================
exports.loadCommentPage =
  async (req, res) => {

    try {

      const {
        classId,
        sessionId,
        term
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

        // SCORES
        const scores =
          await Score.findAll({

            where: {
              studentId: student.id,
              classId,
              sessionId,
              term
            }

          });


        let total = 0;


        for (const item of scores) {
          total += item.total;
        }


        const average =
          scores.length > 0
            ? Number(
                (
                  total /
                  scores.length
                ).toFixed(2)
              )
            : 0;


        // EXISTING COMMENT
        const existingComment =
          await StudentComment.findOne({

            where: {
              studentId: student.id,
              classId,
              sessionId,
              term
            }

          });


        result.push({

          student,

          average,

          comment:
            existingComment || null

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