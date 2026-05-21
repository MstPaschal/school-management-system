const express = require("express");

const router = express.Router();

const {
  createSession,
  getSessions,
  deleteSession
} = require("../controllers/sessionController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");


// CREATE SESSION
router.post(
  "/",
  verifyToken,
  isAdmin,
  createSession
);


// GET SESSIONS
router.get(
  "/",
  verifyToken,
  getSessions
);


// DELETE SESSION
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteSession
);

module.exports = router;