const express = require("express");

const router = express.Router();

const {
  createSubject,
  getSubjects,
  deleteSubject
} = require("../controllers/subjectController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");


// CREATE SUBJECT
router.post(
  "/",
  verifyToken,
  isAdmin,
  createSubject
);


// GET SUBJECTS
router.get(
  "/",
  verifyToken,
  getSubjects
);


// DELETE SUBJECT
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteSubject
);

module.exports = router;