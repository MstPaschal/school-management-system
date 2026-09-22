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
  isAdmin,
  isStaff,
  isStudent
} = require("../middleware/roleMiddleware");

const upload =
  require("../config/multer");


// =========================
// CREATE STUDENT
// ADMIN + SUPERADMIN
// =========================

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("passport"),
  createStudent
);


// =========================
// GET ALL STUDENTS
// ADMIN + SUPERADMIN
// =========================

router.get(
  "/",
  verifyToken,
  isAdmin,
  getStudents
);


// =========================
// GET STUDENTS BY CLASS
// TEACHER + ADMIN + SUPERADMIN
// =========================

router.get(
  "/class/:classId",
  verifyToken,
  isStaff,
  getStudentsByClass
);


// ==========================================
// AUTHENTICATED STUDENT PROFILE
// STUDENT ONLY
// ==========================================

router.get(
  "/me",
  verifyToken,
  isStudent,
  getMyStudentProfile
);


// ==========================================
// RELEASED RESULTS
// STUDENT ONLY
// ==========================================

router.get(
  "/my-results",
  verifyToken,
  isStudent,
  getMyReleasedResults
);

router.get(
  "/my-results/:accessId",
  verifyToken,
  isStudent,
  getMyReleasedResult
);


// ==========================================
// STUDENT PORTAL CREDENTIALS
// ADMIN + SUPERADMIN
// ==========================================

router.get(
  "/credentials/class/:classId",
  verifyToken,
  isAdmin,
  getStudentCredentialsByClass
);

router.get(
  "/credentials/:studentId",
  verifyToken,
  isAdmin,
  getStudentCredential
);


// =========================
// STUDENT STATUS
// ADMIN + SUPERADMIN
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


// =========================
// GET SINGLE STUDENT
// TEACHER + ADMIN + SUPERADMIN
// =========================

router.get(
  "/:id",
  verifyToken,
  isStaff,
  getSingleStudent
);


// =========================
// UPDATE STUDENT
// ADMIN + SUPERADMIN
// =========================

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("passport"),
  updateStudent
);


// =========================
// DELETE STUDENT
// ADMIN + SUPERADMIN
// =========================

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteStudent
);


// =========================
// DEACTIVATE STUDENT
// ADMIN + SUPERADMIN
// =========================

router.put(
  "/deactivate/:id",
  verifyToken,
  isAdmin,
  deactivateStudent
);


// =========================
// ACTIVATE STUDENT
// ADMIN + SUPERADMIN
// =========================

router.put(
  "/activate/:id",
  verifyToken,
  isAdmin,
  activateStudent
);


module.exports = router;