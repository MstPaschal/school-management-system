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
  getStudentCredentialsByClass,
  getStudentCredential
} = require("../controllers/studentCredentialController");

const {
  getMyStudentProfile
} = require("../controllers/studentPortalController");

const {
  getMyReleasedResults,
  getMyReleasedResult
} = require("../controllers/studentResultController");

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


// ==========================================
// AUTHENTICATED STUDENT PROFILE
// STUDENT ONLY
// ==========================================

router.get(
  "/me",
  verifyToken,
  getMyStudentProfile
);


// ==========================================
// RELEASED RESULTS
// STUDENT ONLY
// ==========================================

router.get(
  "/my-results",
  verifyToken,
  getMyReleasedResults
);

router.get(
  "/my-results/:accessId",
  verifyToken,
  getMyReleasedResult
);


// ==========================================
// STUDENT PORTAL CREDENTIALS
// ADMIN ONLY
// ==========================================

// GET STUDENTS WITH PORTAL ACCOUNTS BY CLASS
router.get(
  "/credentials/class/:classId",
  verifyToken,
  isAdmin,
  getStudentCredentialsByClass
);


// GET ONE STUDENT'S PORTAL CREDENTIAL
router.get(
  "/credentials/:studentId",
  verifyToken,
  isAdmin,
  getStudentCredential
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