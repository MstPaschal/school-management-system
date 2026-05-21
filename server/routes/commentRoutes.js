const express = require("express");

const router = express.Router();

const {

  addTemplate,

  getTemplates,

  saveStudentComment,

  loadCommentPage

} = require(
  "../controllers/commentController"
);

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");


// ADD TEMPLATE
router.post(
  "/template",
  verifyToken,
  isAdmin,
  addTemplate
);


// GET TEMPLATES
router.get(
  "/template",
  verifyToken,
  getTemplates
);


// SAVE COMMENT
router.post(
  "/student",
  verifyToken,
  saveStudentComment
);


// LOAD COMMENT PAGE
router.get(
  "/load",
  verifyToken,
  loadCommentPage
);

module.exports = router;