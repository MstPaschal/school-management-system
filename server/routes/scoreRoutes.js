const express = require("express");

const router = express.Router();

const {
  saveScore,
  loadScoreSheet
} = require("../controllers/scoreController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isStaff
} = require("../middleware/roleMiddleware");


// =========================
// SAVE SCORE
// TEACHER + ADMIN + SUPERADMIN
// =========================

router.post(
  "/",
  verifyToken,
  isStaff,
  saveScore
);


// =========================
// LOAD SCORE
// TEACHER + ADMIN + SUPERADMIN
// =========================

router.get(
  "/load",
  verifyToken,
  isStaff,
  loadScoreSheet
);


module.exports = router;