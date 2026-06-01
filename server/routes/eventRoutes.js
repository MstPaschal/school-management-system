const express =
  require("express");

const router =
  express.Router();

const {

  createEvent,

  getEvents,

  getSingleEvent,

  deleteEvent,

  updateEvent

} = require(
  "../controllers/eventController"
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

const upload =
  require(
    "../middleware/uploadEventImages"
  );


// PUBLIC
router.get(
  "/",
  getEvents
);

router.get(
  "/:id",
  getSingleEvent
);


// ADMIN
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.array(
    "images",
    20
  ),
  createEvent
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteEvent
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  updateEvent
);

module.exports =
  router;