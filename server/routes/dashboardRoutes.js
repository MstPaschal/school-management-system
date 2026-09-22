const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getTeacherDashboard
} = require("../controllers/dashboardController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin,
  isTeacher
} = require("../middleware/roleMiddleware");


// =========================
// ADMIN DASHBOARD
// ADMIN + SUPERADMIN ONLY
// =========================

router.get(
  "/stats",
  verifyToken,
  isAdmin,
  getDashboardStats
);


// =========================
// TEACHER DASHBOARD
// TEACHER ONLY
// =========================

router.get(
  "/teacher",
  verifyToken,
  isTeacher,
  getTeacherDashboard
);


module.exports = router;