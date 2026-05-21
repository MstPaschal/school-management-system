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


// CREATE CLASS
router.post(
  "/",
  verifyToken,
  isAdmin,
  createClass
);


// GET CLASSES
router.get(
  "/",
  verifyToken,
  getClasses
);


// DELETE CLASS
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteClass
);

module.exports = router;