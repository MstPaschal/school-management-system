const crypto = require("crypto");

const Student = require("../models/Student");

const ResultPin = require(
  "../models/ResultPin"
);

const UploadedDocument = require(
  "../models/UploadedDocument"
);

const StudentPayment = require(
  "../models/StudentPayment"
);

const StudentComment = require(
  "../models/StudentComment"
);

const AdminSetting = require(
  "../models/AdminSetting"
);

const Score = require("../models/Score");

const Subject = require("../models/Subject");

const Session = require("../models/Session");

const Class = require("../models/Class");

const {
  getGrade,
  getRemark,
  getPosition
} = require("../utils/resultHelpers");



// =========================
// GENERATE RESULT PINS
// =========================
exports.generatePins =
  async (req, res) => {

    try {

      const {
        sessionId,
        term,
        quantity
      } = req.body;

      const pins = [];

      for (
        let i = 0;
        i < quantity;
        i++
      ) {

        let pin;
        let pinExists = true;

        while (pinExists) {

          pin = crypto
            .randomBytes(6)
            .toString("hex")
            .toUpperCase();

          const existingPin =
            await ResultPin.findOne({
              where: { pin }
            });

          if (!existingPin) {

            pinExists = false;

          }

        }

        const createdPin =
          await ResultPin.create({

            pin,

            sessionId,

            term

          });

        pins.push(createdPin);

      }

      res.status(201).json({

        message:
          `${quantity} pins generated successfully`,

        pins

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };



// =========================
// LOAD RESULT PINS
// =========================
exports.loadPins =
  async (req, res) => {

    try {

      const {
        sessionId,
        term
      } = req.query;

      const pins =
        await ResultPin.findAll({

          where: {
            sessionId,
            term
          },

          order: [["createdAt", "DESC"]]

        });

      res.status(200).json(pins);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };



// =========================
// GET STUDENT BY REG NUMBER
// =========================
exports.getStudentByReg =
  async (req, res) => {

    try {

      const student =
        await Student.findOne({

          where: {
            regNumber:
              req.params.regNumber
          }

        });

      if (!student) {

        return res.status(404).json({

          message:
            "Student not found"

        });

      }

      res.json({

        fullName:
          student.fullName

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server error"

      });

    }

  };


  
// =========================
// CHECK RESULT
// =========================
exports.checkResult =
  async (req, res) => {

    try {

      const {
        regNumber,
        pin,
        sessionId,
        term
      } = req.body;


      // =========================
      // FIND STUDENT
      // =========================
      console.log("Incoming Body:", req.body);

      const cleanRegNumber = String(regNumber)
        .trim()
        .toUpperCase();

      console.log("Searching For:", cleanRegNumber);

      const allStudents = await Student.findAll();

      console.log(
        "All Students:",
        allStudents.map((s) => ({
          id: s.id,
          regNumber: s.regNumber
        }))
      );

      const student = await Student.findOne({
        where: {
          regNumber: cleanRegNumber
        }
      });

      console.log("Student Found:", student);


      if (!student) {

        return res.status(404).json({
          message: "Student not found"
        });

      }


      // =========================
      // FIND PIN
      // =========================
      const resultPin =
        await ResultPin.findOne({

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


      // ASSIGN PIN
      if (!resultPin.usedByStudentId) {

        resultPin.usedByStudentId =
          student.id;

      }


      // UPDATE USAGE
      resultPin.usageCount += 1;

      await resultPin.save();


      // =========================
      // SCORES
      // =========================
      const scores =
        await Score.findAll({

          where: {
            studentId: student.id,
            classId:
              student.currentClass,
            sessionId,
            term
          }

        });


      let grandTotal = 0;

      const subjects = [];


      for (const score of scores) {

        const subject = await Subject.findByPk(
          score.subjectId
        );

        if (!subject) {
          continue;
        }

        const total = Number(score.total || 0);

        grandTotal += total;

        // =====================================
        // CLASS SCORES FOR THIS SUBJECT
        // =====================================
        const classSubjectScores =
          await Score.findAll({

            where: {

              subjectId: score.subjectId,

              classId: student.currentClass,

              sessionId,

              term

            }

          });

        // GET ALL TOTALS
        const totals =
          classSubjectScores.map(
            (item) => Number(item.total || 0)
          );

        // CLASS HIGHEST
        const classHighest =
          totals.length > 0
            ? Math.max(...totals)
            : 0;

        // CLASS LOWEST
        const classLowest =
          totals.length > 0
            ? Math.min(...totals)
            : 0;

        // SUBJECT AVERAGE
        const subjectAverage =
          Number(
            (
              (classHighest + classLowest) / 2
            ).toFixed(2)
          );

        subjects.push({

          subject: subject.subjectName,

          firstCA: Number(score.firstCA || 0),

          secondCA: Number(score.secondCA || 0),

          project: Number(score.project || 0),

          exam: Number(score.exam || 0),

          total,

          classHighest,

          classLowest,

          subjectAverage,

          grade: getGrade(total),

          remark: getRemark(total)

        });

      }


      // =========================
      // AVERAGE
      // =========================
      const average =

        subjects.length > 0

          ? Number(
              (
                grandTotal /
                subjects.length
              ).toFixed(2)
            )

          : 0;


      // =========================
      // POSITIONING
      // =========================
      const classStudents =
        await Student.findAll({

          where: {

            currentClass:
              student.currentClass,

            status: "ACTIVE"

          }

        });


      const ranking = [];


      for (const clsStudent of classStudents) {

        const clsScores =
          await Score.findAll({

            where: {

              studentId:
                clsStudent.id,

              classId:
                student.currentClass,

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

            ? total /
              clsScores.length

            : 0;


        ranking.push({

          studentId:
            clsStudent.id,

          average: avg

        });

      }


      ranking.sort(
        (a, b) =>
          b.average - a.average
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

          ranking[i].position =
            i + 1;

        }

      }


      const currentStudent =
        ranking.find(

          (item) =>
            item.studentId === student.id

        );


      const position =
        getPosition(
          currentStudent?.position || 0
        );


      // =========================
      // COMMENTS
      // =========================
      const studentComment =
        await StudentComment.findOne({

          where: {

            studentId:
              student.id,

            classId:
              student.currentClass,

            sessionId,

            term

          }

        });

      
      // SESSION
      const session =
        await Session.findByPk(sessionId);


      // CLASS 
      const currentClass =
        await Class.findByPk(
          student.currentClass
        );


      // =========================
      // SETTINGS
      // =========================
      const settings =
        await AdminSetting.findOne({

          where: {

            classId:
              student.currentClass,

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

            studentId:
              student.id,

            classId:
              student.currentClass,

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

            classId:
              student.currentClass,

            sessionId,

            term

          }

        });


      // =========================
      // CUMULATIVE RESULT
      // =========================

      let cumulativeResult = null;

      if (term === "3rd Term") {

        // FIRST TERM SCORES
        const firstTermScores =
          await Score.findAll({

            where: {
              studentId: student.id,
              classId: student.currentClass,
              sessionId,
              term: "1st Term"
            }

          });

        // SECOND TERM SCORES
        const secondTermScores =
          await Score.findAll({

            where: {
              studentId: student.id,
              classId: student.currentClass,
              sessionId,
              term: "2nd Term"
            }

          });

        // THIRD TERM SCORES
        const thirdTermScores =
          await Score.findAll({

            where: {
              studentId: student.id,
              classId: student.currentClass,
              sessionId,
              term: "3rd Term"
            }

          });

        // CALCULATE TERM AVERAGES
        const calcAverage = (scores) => {

          if (scores.length === 0) return 0;

          let total = 0;

          scores.forEach((score) => {

            total += Number(score.total);

          });

          return Number(
            (total / scores.length).toFixed(2)
          );

        };

        const firstTermAverage =
          calcAverage(firstTermScores);

        const secondTermAverage =
          calcAverage(secondTermScores);

        const thirdTermAverage =
          calcAverage(thirdTermScores);

        // TRUE YEARLY CUMULATIVE
        const cumulativeAverage =
          Number(
            (
              (
                firstTermAverage +
                secondTermAverage +
                thirdTermAverage
              ) / 3
            ).toFixed(2)
          );

        // GRADE
        const cumulativeGrade =
          getGrade(cumulativeAverage);

        // PROMOTION STATUS
        const promotionStatus =
          cumulativeAverage >= 50
            ? "PROMOTED"
            : "NOT PROMOTED";

        cumulativeResult = {

          firstTermAverage,

          secondTermAverage,

          thirdTermAverage,

          cumulativeAverage,

          cumulativeGrade,

          promotionStatus

        };

      }


      // =========================
      // RESPONSE
      // =========================
      res.status(200).json({

        student: {
          ...student.toJSON(),
          currentClassName:
            currentClass?.className || "N/A"
        },

        sessionName:
          session?.sessionName || "",

        term,

        result: {

          subjects,

          total: grandTotal,

          average,

          mainGrade:
            getGrade(average),

          position,

          teacherComment:
            studentComment?.teacherComment || "",

          proprietorComment:
            studentComment?.proprietorComment || "",

          nextTermResumptionDate:
            settings?.nextTermResumes || "",

          cumulativeResult,

          schoolName:
            "GRISFIELD SCHOOLS",

          schoolAddress: 
            "Plot 107 Gracious Estate, Nkwelle Ezunaka",

          schoolPhone: "",

          principalSignature: "",

          schoolStamp: ""

        },

        payment,

        documents,

        pinUsage: {

          used:
            resultPin.usageCount,

          remaining:
            5 -
            resultPin.usageCount

        }

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };