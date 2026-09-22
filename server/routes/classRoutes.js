const express = require("express");

const router = express.Router();

const {
  createClass,
  getClasses,
  deleteClass
} = require("../controllers/classController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");


// =========================
// CREATE CLASS
// ADMIN + SUPERADMIN
// =========================

router.post(
  "/",
  verifyToken,
  isAdmin,
  createClass
);


// =========================
// GET CLASSES
// ADMIN + SUPERADMIN
// =========================

router.get(
  "/",
  verifyToken,
  isAdmin,
  getClasses
);


// =========================
// DELETE CLASS
// ADMIN + SUPERADMIN
// =========================

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteClass
);


module.exports = router;