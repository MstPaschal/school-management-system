const express = require("express");

const router = express.Router();

const {
  viewStudentResult,
  checkResult
} = require("../controllers/resultController");

const {
  verifyToken
} = require("../middleware/authMiddleware");


// ======================================
// ADMIN RESULT VIEW
// ======================================
router.get(
  "/view",
  verifyToken,
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