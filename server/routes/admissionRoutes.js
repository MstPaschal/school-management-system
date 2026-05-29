const express =
  require("express");

const router =
  express.Router();

const {

  submitApplication,

  getApplications,

  acceptApplication,

  rejectApplication

} = require(
  "../controllers/admissionController"
);

const {
  verifyToken
} = require(
  "../middleware/authMiddleware"
);

const {
  isAdmin
} = require(
  "../middleware/roleMiddleware"
);


// PUBLIC
router.post(
  "/",
  submitApplication
);


// ADMIN
router.get(
  "/",
  verifyToken,
  isAdmin,
  getApplications
);

router.put(
  "/accept/:id",
  verifyToken,
  isAdmin,
  acceptApplication
);

router.put(
  "/reject/:id",
  verifyToken,
  isAdmin,
  rejectApplication
);

module.exports =
  router;