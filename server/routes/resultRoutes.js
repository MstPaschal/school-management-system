const express = require("express");

const router = express.Router();

const {
  viewStudentResult,
  checkResult
} = require("../controllers/resultController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isStaff
} = require("../middleware/roleMiddleware");


// ======================================
// STAFF RESULT VIEW
// TEACHER + ADMIN + SUPERADMIN
// ======================================

router.get(
  "/view",
  verifyToken,
  isStaff,
  viewStudentResult
);


// ======================================
// PUBLIC RESULT CHECKER
// ======================================

router.post(
  "/result-checker",
  checkResult
);


module.exports = router;