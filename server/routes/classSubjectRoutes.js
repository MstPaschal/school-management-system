const express = require("express");

const router = express.Router();

const {
  assignSubject,
  getClassSubjects,
  removeSubject
} = require("../controllers/classSubjectController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");


// =========================
// ASSIGN SUBJECT
// ADMIN + SUPERADMIN
// =========================

router.post(
  "/assign",
  verifyToken,
  isAdmin,
  assignSubject
);


// =========================
// GET CLASS SUBJECTS
// ADMIN + SUPERADMIN
// =========================

router.get(
  "/:classId",
  verifyToken,
  isAdmin,
  getClassSubjects
);


// =========================
// REMOVE SUBJECT
// ADMIN + SUPERADMIN
// =========================

router.delete(
  "/:classId/:subjectId",
  verifyToken,
  isAdmin,
  removeSubject
);


module.exports = router;