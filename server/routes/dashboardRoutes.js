const express =
  require("express");

const router =
  express.Router();

const {

  getDashboardStats,

  getTeacherDashboard

} = require(
  "../controllers/dashboardController"
);

const {

  verifyToken

} = require(
  "../middleware/authMiddleware"
);


// ======================================
// ADMIN DASHBOARD
// ======================================
router.get(
  "/stats",
  verifyToken,
  getDashboardStats
);


// ======================================
// TEACHER DASHBOARD
// ======================================
router.get(
  "/teacher",
  verifyToken,
  getTeacherDashboard
);

module.exports = router;