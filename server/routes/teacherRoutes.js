const express = require("express");

const router = express.Router();

const {
  createTeacher,
  getTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher
} = require("../controllers/teacherController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");

const upload = require("../config/multer");


// CREATE TEACHER
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("passport"),
  createTeacher
);


// GET ALL TEACHERS
router.get(
  "/",
  verifyToken,
  isAdmin,
  getTeachers
);


// GET SINGLE TEACHER
router.get(
  "/:id",
  verifyToken,
  isAdmin,
  getSingleTeacher
);


// UPDATE TEACHER
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  updateTeacher
);


// DELETE TEACHER
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteTeacher
);

module.exports = router;