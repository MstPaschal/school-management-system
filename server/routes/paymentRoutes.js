const express = require("express");

const router = express.Router();

const {
  saveAdminSetting,
  getAdminSetting,
  loadPaymentPage,
  saveStudentPayment,
  viewPaymentReport
} = require("../controllers/paymentController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  isAdmin,
  isStaff
} = require("../middleware/roleMiddleware");


// =========================
// SAVE ADMIN SETTINGS
// ADMIN + SUPERADMIN
// =========================

router.post(
  "/admin-setting",
  verifyToken,
  isAdmin,
  saveAdminSetting
);


// =========================
// GET ADMIN SETTING
// AUTHENTICATED USERS
// No role restriction
// =========================

router.get(
  "/admin-setting",
  verifyToken,
  getAdminSetting
);


// =========================
// LOAD PAYMENT PAGE
// TEACHER + ADMIN + SUPERADMIN
// =========================

router.get(
  "/load",
  verifyToken,
  isStaff,
  loadPaymentPage
);


// =========================
// SAVE STUDENT PAYMENT
// TEACHER + ADMIN + SUPERADMIN
// =========================

router.post(
  "/student",
  verifyToken,
  isStaff,
  saveStudentPayment
);


// =========================
// VIEW PAYMENT REPORT
// AUTHENTICATED USERS
// No role restriction
// =========================

router.get(
  "/report",
  verifyToken,
  viewPaymentReport
);


module.exports = router;