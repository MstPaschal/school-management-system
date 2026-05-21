const express = require("express");

const router = express.Router();

const {
  createStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getStudentsByClass,
  deactivateStudent,
  activateStudent
} = require("../controllers/studentController");

const {
  loadStudentStatus,
  changeStudentStatus
} = require("../controllers/studentStatusController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");

const upload = require("../config/multer");


// CREATE STUDENT
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("passport"),
  createStudent
);


// GET ALL STUDENTS
router.get(
  "/",
  verifyToken,
  getStudents
);


// GET STUDENTS BY CLASS
router.get(
  "/class/:classId",
  verifyToken,
  getStudentsByClass
);


// =========================
// STUDENT STATUS
// =========================
router.get(
  "/status",
  verifyToken,
  isAdmin,
  loadStudentStatus
);

router.put(
  "/status/:studentId",
  verifyToken,
  isAdmin,
  changeStudentStatus
);


// GET SINGLE STUDENT
router.get(
  "/:id",
  verifyToken,
  getSingleStudent
);

// UPDATE STUDENT
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("passport"),
  updateStudent
);

// DELETE STUDENT
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteStudent
);


// DEACTIVATE STUDENT
router.put(
  "/deactivate/:id",
  verifyToken,
  isAdmin,
  deactivateStudent
);


// ACTIVATE STUDENT
router.put(
  "/activate/:id",
  verifyToken,
  isAdmin,
  activateStudent
);

module.exports = router;