const express = require("express");

const router = express.Router();

const {
  generatePins,
  loadPins,
  checkResult,
  getStudentByReg
} = require(
  "../controllers/resultCheckerController"
);

const {
  verifyToken,
  verifySuperAdmin
} = require(
  "../middleware/authMiddleware"
);


// =========================
// GENERATE RESULT PINS
// =========================
router.post(
  "/generate",
  verifyToken,
  verifySuperAdmin,
  generatePins
);


// =========================
// LOAD RESULT PINS
// =========================
router.get(
  "/pins",
  verifyToken,
  verifySuperAdmin,
  loadPins
);


// =========================
// GET STUDENT BY REG NUMBER
// =========================
router.get(
  "/student-by-reg/:regNumber",
  getStudentByReg
);


// =========================
// CHECK RESULT
// =========================
router.post(
  "/",
  checkResult
);

module.exports = router;