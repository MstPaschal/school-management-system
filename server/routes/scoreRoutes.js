const express = require("express");

const router = express.Router();

const {
  saveScore,
  loadScoreSheet
} = require("../controllers/scoreController");

const {
  verifyToken
} = require("../middleware/authMiddleware");


// SAVE SCORE
router.post(
  "/",
  verifyToken,
  saveScore
);


// LOAD SCORE
router.get(
  "/load",
  verifyToken,
  loadScoreSheet
);

module.exports = router;