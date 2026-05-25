const express = require("express");

const router = express.Router();

const {
  generatePins,
  loadPins,
  checkResult
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
// CHECK RESULT
// =========================
router.post(
  "/",
  checkResult
);


// =========================
// GET STUDENT BY REG NUMBER
// =========================
router.get(
  "/student-by-reg/:regNumber",
  resultCheckerController.getStudentByReg
);

module.exports = router;