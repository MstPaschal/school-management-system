const Student = require("../models/Student");
const StudentResultAccess = require("../models/StudentResultAccess");
const Session = require("../models/Session");
const Class = require("../models/Class");
const resultCheckerController = require ("./resultCheckerController");

exports.getMyReleasedResults = async (req, res) => {
  try {
    // ==========================================
    // AUTHENTICATION CHECK
    // ==========================================
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    // ==========================================
    // STUDENT ONLY
    // ==========================================
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Student access required"
      });
    }

    // ==========================================
    // FIND STUDENT FROM LOGGED-IN USER
    // ==========================================
    const student = await Student.findOne({
      where: {
        userId: req.user.id
      }
    });

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }

    // ==========================================
    // FIND RELEASED RESULTS
    // ==========================================
    const accessRecords =
      await StudentResultAccess.findAll({
        where: {
          studentId: student.id
        },
        order: [
          ["releasedAt", "DESC"]
        ]
      });

    // ==========================================
    // BUILD RESULT LIST
    // ==========================================
    const results = [];

    for (const access of accessRecords) {
      const session =
        await Session.findByPk(
          access.sessionId
        );

      const currentClass =
        await Class.findByPk(
          access.classId
        );

      results.push({
        id: access.id,
        sessionId: access.sessionId,
        sessionName:
          session?.sessionName || "N/A",
        term: access.term,
        classId: access.classId,
        className:
          currentClass?.className || "N/A",
        releasedAt:
          access.releasedAt,
        releaseMethod:
          access.releaseMethod
      });
    }

    // ==========================================
    // RESPONSE
    // ==========================================
    return res.status(200).json({
      student: {
        id: student.id,
        fullName: student.fullName,
        regNumber: student.regNumber
      },
      results
    });

  } catch (error) {
    console.log(
      "GET MY RELEASED RESULTS ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to load released results"
    });
  }
};


exports.getMyReleasedResult =
  async (req, res) => {

    try {

      // =========================
      // AUTHENTICATED STUDENT
      // =========================

      if (
        !req.user ||
        !req.user.id
      ) {

        return res.status(401).json({
          message:
            "Authentication required"
        });

      }


      if (
        req.user.role !==
        "student"
      ) {

        return res.status(403).json({
          message:
            "Student access required"
        });

      }


      // =========================
      // FIND STUDENT
      // =========================

      const student =
        await Student.findOne({

          where: {
            userId:
              req.user.id
          }

        });


      if (!student) {

        return res.status(404).json({
          message:
            "Student profile not found"
        });

      }


      // =========================
      // ACCESS ID
      // =========================

      const {
        accessId
      } = req.params;


      if (!accessId) {

        return res.status(400).json({
          message:
            "Result access ID is required"
        });

      }


      // =========================
      // FIND RELEASED RESULT
      // =========================

      const access =
        await StudentResultAccess.findOne({

          where: {

            id: accessId,

            studentId:
              student.id

          }

        });


      if (!access) {

        return res.status(404).json({
          message:
            "This result has not been released to your portal"
        });

      }


      // =========================
      // BUILD RESULT
      // =========================
      //
      // IMPORTANT:
      // This uses the SAME academic
      // result engine as the public
      // Result Checker.
      //
      // It does NOT consume a PIN.
      // It does NOT create a release.
      // =========================

      const result =
        await resultCheckerController
          .buildStudentAcademicResult({

            studentId:
              access.studentId,

            classId:
              access.classId,

            sessionId:
              access.sessionId,

            term:
              access.term

          });


      // =========================
      // STUDENT PORTAL RESPONSE
      // =========================

      return res.status(200).json({

        access: {

          id:
            access.id,

          sessionId:
            access.sessionId,

          term:
            access.term,

          classId:
            access.classId,

          releasedAt:
            access.releasedAt,

          releaseMethod:
            access.releaseMethod

        },

        ...result

      });

    } catch (error) {

      console.log(
        "GET MY RELEASED RESULT ERROR:",
        error
      );

      return res.status(500).json({

        message:
          "Failed to load released result"

      });

    }

  };