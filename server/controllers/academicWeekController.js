const {Op} = require("sequelize");

const AcademicWeek = require("../models/AcademicWeek");
const Session = require("../models/Session");


// =========================
// CREATE ACADEMIC WEEK
// ADMIN + SUPERADMIN
// =========================

const createAcademicWeek = async (req, res) => {

  try {

    const {
      sessionId,
      term,
      weekNumber,
      startDate,
      endDate
    } = req.body;


    // VALIDATION

    if (
      !sessionId ||
      !term ||
      !weekNumber ||
      !startDate ||
      !endDate
    ) {

      return res.status(400).json({
        message:
          "Session, term, week number, start date and end date are required"
      });

    }


    // CHECK SESSION

    const session =
      await Session.findByPk(sessionId);

    if (!session) {

      return res.status(404).json({
        message: "Session not found"
      });

    }


    // CHECK DATE ORDER

    if (
      new Date(startDate) >
      new Date(endDate)
    ) {

      return res.status(400).json({
        message:
          "Start date cannot be after end date"
      });

    }


    // CREATE WEEK

    const academicWeek =
      await AcademicWeek.create({

        sessionId,
        term,
        weekNumber,
        startDate,
        endDate

      });


    return res.status(201).json({

      message:
        "Academic week created successfully",

      academicWeek

    });

  } catch (error) {

    console.log(
      "CREATE ACADEMIC WEEK ERROR:",
      error
    );


    // DUPLICATE WEEK

    if (
      error.name ===
      "SequelizeUniqueConstraintError"
    ) {

      return res.status(400).json({

        message:
          "This academic week already exists for this session and term"

      });

    }


    return res.status(500).json({

      message:
        "Failed to create academic week"

    });

  }

};


// =========================
// GET ACADEMIC WEEKS
// ADMIN + SUPERADMIN
// =========================

const getAcademicWeeks = async (req, res) => {

  try {

    const {
      sessionId,
      term
    } = req.query;


    const where = {};


    if (sessionId) {

      where.sessionId =
        sessionId;

    }


    if (term) {

      where.term =
        term;

    }


    const academicWeeks =
      await AcademicWeek.findAll({

        where,

        include: [
          {
            model: Session,
            attributes: [
              "id",
              "sessionName"
            ]
          }
        ],

        order: [
          ["weekNumber", "ASC"]
        ]

      });


    return res.json(
      academicWeeks
    );

  } catch (error) {

    console.log(
      "GET ACADEMIC WEEKS ERROR:",
      error
    );


    return res.status(500).json({

      message:
        "Failed to load academic weeks"

    });

  }

};


// =========================
// DELETE ACADEMIC WEEK
// ADMIN + SUPERADMIN
// =========================

const deleteAcademicWeek = async (
  req,
  res
) => {

  try {

    const {
      id
    } = req.params;


    const academicWeek =
      await AcademicWeek.findByPk(id);


    if (!academicWeek) {

      return res.status(404).json({

        message:
          "Academic week not found"

      });

    }


    await academicWeek.destroy();


    return res.json({

      message:
        "Academic week deleted successfully"

    });

  } catch (error) {

    console.log(
      "DELETE ACADEMIC WEEK ERROR:",
      error
    );


    return res.status(500).json({

      message:
        "Failed to delete academic week"

    });

  }

};


// =========================
// GET ACADEMIC WEEK BY DATE
// ADMIN + SUPERADMIN
// =========================

const getAcademicWeekByDate = async (req, res) => {

  try {

    const {
      sessionId,
      term,
      date
    } = req.query;

    // VALIDATION

    if (!sessionId || !term || !date) {

      return res.status(400).json({

        message:
          "Session, term and date are required"

      });

    }

    // FIND ACADEMIC WEEK

    const academicWeek =
      await AcademicWeek.findOne({

        where: {

          sessionId,
          term,

          startDate: {
            [Op.lte]: date
          },

          endDate: {
            [Op.gte]: date
          }

        },

        include: [

          {

            model: Session,

            attributes: [
              "id",
              "sessionName"
            ]

          }

        ]

      });

    // NO WEEK FOUND

    if (!academicWeek) {

      return res.status(404).json({

        message:
          "No academic week found for this date"

      });

    }

    return res.json(
      academicWeek
    );

  } catch (error) {

    console.log(
      "GET ACADEMIC WEEK BY DATE ERROR:",
      error
    );

    return res.status(500).json({

      message:
        "Failed to find academic week"

    });

  }

};


module.exports = {

  createAcademicWeek,
  getAcademicWeeks,
  deleteAcademicWeek,
  getAcademicWeekByDate

};