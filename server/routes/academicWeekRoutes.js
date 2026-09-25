const express = require("express");

const router =
  express.Router();


const {

  createAcademicWeek,
  getAcademicWeeks,
  deleteAcademicWeek,
  getAcademicWeekByDate

} = require(
  "../controllers/academicWeekController"
);


const {
  verifyToken
} = require(
  "../middleware/authMiddleware"
);


const {
  isAdmin
} = require(
  "../middleware/roleMiddleware"
);


// =========================
// CREATE ACADEMIC WEEK
// ADMIN + SUPERADMIN
// =========================

router.post(
  "/",
  verifyToken,
  isAdmin,
  createAcademicWeek
);


// =========================
// GET ACADEMIC WEEKS
// ADMIN + SUPERADMIN
// =========================

router.get(
  "/",
  verifyToken,
  isAdmin,
  getAcademicWeeks
);


// =========================
// DELETE ACADEMIC WEEK
// ADMIN + SUPERADMIN
// =========================

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteAcademicWeek
);


// =========================
// GET ACADEMIC WEEK BY DATE
// ADMIN + SUPERADMIN
// =========================

router.get(
  "/current",
  verifyToken,
  isAdmin,
  getAcademicWeekByDate
);


module.exports = router;