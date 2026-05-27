const express = require("express");

const router = express.Router();

const {

  uploadDocument,

  loadDocuments,

  deleteDocument

} = require(
  "../controllers/documentController"
);

const upload =
  require("../config/multer");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");


// UPLOAD DOCUMENT
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("document"),
  uploadDocument
);


// LOAD DOCUMENTS
router.get(
  "/",
  verifyToken,
  loadDocuments
);


// DELETE DOCUMENT
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteDocument
);

module.exports = router;