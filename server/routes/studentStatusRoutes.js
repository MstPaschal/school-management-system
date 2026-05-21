const express = require("express");

const router = express.Router();

const {

  loadStudentStatus,

  changeStudentStatus

} = require(
  "../controllers/studentStatusController"
);

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");


// LOAD STATUS PAGE
router.get(
  "/",
  verifyToken,
  isAdmin,
  loadStudentStatus
);


// CHANGE STATUS
router.put(
  "/:studentId",
  verifyToken,
  isAdmin,
  changeStudentStatus
);

module.exports = router;