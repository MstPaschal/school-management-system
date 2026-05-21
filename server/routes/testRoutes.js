const express = require("express");

const router = express.Router();

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin
} = require("../middleware/roleMiddleware");


// ADMIN ONLY ROUTE
router.get(
  "/admin-only",
  verifyToken,
  isAdmin,
  (req, res) => {

    res.json({
      message: "Welcome Admin"
    });

  }
);

module.exports = router;