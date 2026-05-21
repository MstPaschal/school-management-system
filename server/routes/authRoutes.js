const express = require("express");

const router = express.Router();

const {

  registerAdmin,

  login,

  getAdmins,

  updateAdmin,

  deleteAdmin,

  forgotPassword,

  resetPassword,

  changePassword

} = require("../controllers/authController");

const {

  verifyToken,

  verifySuperAdmin

} = require("../middleware/authMiddleware");


// REGISTER ADMIN
router.post(

  "/register-admin",

  verifyToken,

  verifySuperAdmin,

  registerAdmin

);


// LOGIN
router.post(

  "/login",

  login

);


// FORGOT PASSWORD
router.post(

  "/forgot-password",

  forgotPassword

);


// RESET PASSWORD
router.post(

  "/reset-password/:token",

  resetPassword

);


// GET ADMINS
router.get(

  "/admins",

  verifyToken,

  verifySuperAdmin,

  getAdmins

);


// UPDATE ADMIN
router.put(

  "/admins/:id",

  verifyToken,

  verifySuperAdmin,

  updateAdmin

);


// DELETE ADMIN
router.delete(

  "/admins/:id",

  verifyToken,

  verifySuperAdmin,

  deleteAdmin

);


// CHANGE PASSWORD
router.post(
  "/change-password",
  verifyToken,
  changePassword
);

module.exports = router;