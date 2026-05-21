const express = require("express");

const router = express.Router();

const {

  saveAdminSetting,

  getAdminSetting,

  loadPaymentPage,

  saveStudentPayment,

  viewPaymentReport

} = require(
  "../controllers/paymentController"
);

const {
  verifyToken
} = require("../middleware/authMiddleware");


// SAVE ADMIN SETTINGS
router.post(
  "/admin-setting",
  verifyToken,
  saveAdminSetting
);


// GET ADMIN SETTING
router.get(
  "/admin-setting",
  verifyToken,
  getAdminSetting
);


// LOAD PAYMENT PAGE
router.get(
  "/load",
  verifyToken,
  loadPaymentPage
);


// SAVE PAYMENT
router.post(
  "/student",
  verifyToken,
  saveStudentPayment
);


// VIEW PAYMENT REPORT
router.get(
  "/report",
  verifyToken,
  viewPaymentReport
);

module.exports = router;