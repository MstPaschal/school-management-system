const Score = require("../models/Score");
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const StudentComment = require("../models/StudentComment");
const AdminSetting = require("../models/AdminSetting");
const Session = require("../models/Session");
const Class = require("../models/Class");
const StudentPayment = require("../models/StudentPayment");
const UploadedDocument = require("../models/UploadedDocument");
const ResultPin = require("../models/ResultPin");

const {
  getGrade,
  getRemark,
  getPosition
} = require("../utils/resultHelpers");


// ======================================
// VIEW STUDENT RESULT
// ======================================
exports.viewStudentResult = async (req, res) => {

  try {

    const {
      studentId,
      classId,
      sessionId,
      term
    } = req.query;


    // =========================
    // STUDENT
    // =========================
    const student = await Student.findByPk(studentId);

    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }


    // =========================
    // SESSION
    // =========================
    const session = await Session.findByPk(sessionId);


    // =========================
    // CLASS
    // =========================
    const currentClass = await Class.findByPk(classId);


    // =========================
    // SCORES
    // =========================
    const scores = await Score.findAll({

      where: {
        studentId,
        classId,
        sessionId,
        term
      }

    });


    let grandTotal = 0;

    const resultSubjects = [];


    for (const score of scores) {

      const subject = await Subject.findByPk(
        score.subjectId
      );

      if (!subject) continue;

      grandTotal += Number(score.total || 0);

      resultSubjects.push({

        subject: subject.subjectName,

        firstCA: score.firstCA,

        secondCA: score.secondCA,

        project: score.project,

        exam: score.exam,

        total: score.total,

        grade: getGrade(score.total),

        remark: getRemark(score.total)

      });

    }


    // =========================
    // AVERAGE
    // =========================
    const average =

      resultSubjects.length > 0

        ? Number(
            (
              grandTotal /
              resultSubjects.length
            ).toFixed(2)
          )

        : 0;


    // =========================
    // POSITION
    // =========================
    const classStudents = await Student.findAll({

      where: {
        currentClass: classId,
        status: "ACTIVE"
      }

    });


    const ranking = [];


    for (const clsStudent of classStudents) {

      const clsScores = await Score.findAll({

        where: {

          studentId: clsStudent.id,

          classId,

          sessionId,

          term

        }

      });


      let total = 0;


      for (const item of clsScores) {

        total += Number(item.total || 0);

      }


      const avg =

        clsScores.length > 0

          ? total / clsScores.length

          : 0;


      ranking.push({

        studentId: clsStudent.id,

        average: avg

      });

    }


    ranking.sort(
      (a, b) => b.average - a.average
    );


    for (let i = 0; i < ranking.length; i++) {

      if (i === 0) {

        ranking[i].position = 1;

      }

      else if (

        ranking[i].average ===
        ranking[i - 1].average

      ) {

        ranking[i].position =
          ranking[i - 1].position;

      }

      else {

        ranking[i].position = i + 1;

      }

    }


    const currentStudentRank = ranking.find(

      (item) =>
        item.studentId == studentId

    );


    const formattedPosition = getPosition(

      currentStudentRank?.position || 0

    );


    // =========================
    // COMMENTS
    // =========================
    const studentComment =
      await StudentComment.findOne({

        where: {
          studentId,
          classId,
          sessionId,
          term
        }

      });


    // =========================
    // SETTINGS
    // =========================
    const settings =
      await AdminSetting.findOne({

        where: {
          classId,
          sessionId,
          term
        }

      });


    // =========================
    // PAYMENT
    // =========================
    const payment =
      await StudentPayment.findOne({

        where: {
          studentId,
          classId,
          sessionId,
          term
        }

      });


    // =========================
    // DOCUMENTS
    // =========================
    const documents =
      await UploadedDocument.findAll({

        where: {
          classId,
          sessionId,
          term
        }

      });


    // =========================
    // CUMULATIVE RESULT
    // =========================
    let cumulativeResult = null;


    if (term === "3rd Term") {

      const firstTermScores =
        await Score.findAll({

          where: {
            studentId,
            classId,
            sessionId,
            term: "1st Term"
          }

        });


      const secondTermScores =
        await Score.findAll({

          where: {
            studentId,
            classId,
            sessionId,
            term: "2nd Term"
          }

        });


      let firstTotal = 0;
      let secondTotal = 0;


      for (const item of firstTermScores) {

        firstTotal += Number(item.total || 0);

      }


      for (const item of secondTermScores) {

        secondTotal += Number(item.total || 0);

      }


      const firstAverage =

        firstTermScores.length > 0

          ? firstTotal /
            firstTermScores.length

          : 0;


      const secondAverage =

        secondTermScores.length > 0

          ? secondTotal /
            secondTermScores.length

          : 0;


      const cumulativeAverage = Number(

        (
          (
            firstAverage +
            secondAverage +
            average
          ) / 3
        ).toFixed(2)

      );


      cumulativeResult = {

        cumulativeAverage,

        cumulativeGrade:
          getGrade(cumulativeAverage),

        promotionStatus:

          cumulativeAverage >= 50

            ? "PROMOTED"

            : "NOT PROMOTED"

      };

    }


    // =========================
    // RESPONSE
    // =========================
    res.status(200).json({

      student: {

        ...student.toJSON(),

        currentClassName:
          currentClass?.className || ""

      },

      sessionName:
        session?.sessionName || "",

      term,

      result: {

        subjects: resultSubjects,

        total: grandTotal,

        average,

        mainGrade:
          getGrade(average),

        position:
          formattedPosition,

        cumulativeResult,

        teacherComment:
          studentComment?.teacherComment || "",

        proprietorComment:
          studentComment?.proprietorComment || "",

        nextTermResumptionDate:
          settings?.nextTermResumes || "",

        schoolName:
          settings?.schoolName ||
          "GRISFIELD SCHOOLS",

        schoolAddress:
          settings?.schoolAddress || "",

        schoolPhone:
          settings?.schoolPhone || ""

      },

      payment,

      documents

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


// ======================================
// CHECK RESULT
// ======================================
exports.checkResult = async (req, res) => {

  try {

    const {
      regNumber,
      pin,
      sessionId,
      term
    } = req.body;


    // =========================
    // STUDENT
    // =========================
    const student = await Student.findOne({

      where: { regNumber }

    });


    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }


    // =========================
    // PIN
    // =========================
    const resultPin = await ResultPin.findOne({

      where: {
        pin,
        sessionId,
        term
      }

    });


    if (!resultPin) {

      return res.status(400).json({
        message: "Invalid pin"
      });

    }


    // =========================
    // PIN OWNERSHIP
    // =========================
    if (

      resultPin.usedByStudentId &&

      resultPin.usedByStudentId !== student.id

    ) {

      return res.status(400).json({

        message:
          "This pin belongs to another student"

      });

    }


    // =========================
    // USAGE LIMIT
    // =========================
    if (resultPin.usageCount >= 5) {

      return res.status(400).json({

        message:
          "Pin usage limit exceeded"

      });

    }


    // =========================
    // ASSIGN PIN
    // =========================
    if (!resultPin.usedByStudentId) {

      resultPin.usedByStudentId =
        student.id;

    }


    resultPin.usageCount += 1;

    await resultPin.save();


    // =========================
    // PASS TO RESULT VIEW
    // =========================
    req.query = {

      studentId: student.id,

      classId: student.currentClass,

      sessionId,

      term

    };


    return exports.viewStudentResult(
      req,
      res
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};