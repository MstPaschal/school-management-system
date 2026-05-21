const express = require("express");

const router = express.Router();

const {

  loadStudentsForPromotion,

  promoteStudents

} = require(
  "../controllers/promotionController"
);

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");


// LOAD STUDENTS
router.get(
  "/load",
  verifyToken,
  isAdmin,
  loadStudentsForPromotion
);


// PROMOTE
router.post(
  "/",
  verifyToken,
  isAdmin,
  promoteStudents
);

module.exports = router;