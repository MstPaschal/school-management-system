const express = require("express");

const router = express.Router();

const {
  addTemplate,
  getTemplates,
  saveStudentComment,
  loadCommentPage
} = require("../controllers/commentController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin,
  isStaff
} = require("../middleware/roleMiddleware");


// =========================
// ADD COMMENT TEMPLATE
// ADMIN + SUPERADMIN
// =========================

router.post(
  "/template",
  verifyToken,
  isAdmin,
  addTemplate
);


// =========================
// GET COMMENT TEMPLATES
// TEACHER + ADMIN + SUPERADMIN
// =========================

router.get(
  "/template",
  verifyToken,
  isStaff,
  getTemplates
);


// =========================
// SAVE STUDENT COMMENT
// TEACHER + ADMIN + SUPERADMIN
// =========================

router.post(
  "/student",
  verifyToken,
  isStaff,
  saveStudentComment
);


// =========================
// LOAD COMMENT PAGE
// TEACHER + ADMIN + SUPERADMIN
// =========================

router.get(
  "/load",
  verifyToken,
  isStaff,
  loadCommentPage
);


module.exports = router;