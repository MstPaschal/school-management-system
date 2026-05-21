const express = require("express");

const router = express.Router();

const {
  assignSubject,
  getClassSubjects,
  removeSubject
} = require(
  "../controllers/classSubjectController"
);

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");


// ASSIGN SUBJECT
router.post(
  "/assign",
  verifyToken,
  isAdmin,
  assignSubject
);


// GET CLASS SUBJECTS
router.get(
  "/:classId",
  verifyToken,
  getClassSubjects
);


// REMOVE SUBJECT
router.delete(
  "/:classId/:subjectId",
  verifyToken,
  isAdmin,
  removeSubject
);

module.exports = router;