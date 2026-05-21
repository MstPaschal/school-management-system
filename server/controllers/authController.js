const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const nodemailer = require("nodemailer");

const User = require("../models/user");

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS

    }

  });


// REGISTER ADMIN
exports.registerAdmin = async (req, res) => {
  try {

    const {
      username,
      email,
      password
    } = req.body;

    // CHECK IF USER EXISTS
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({

      username,

      email,

      password: hashedPassword,

      role: "admin"

    });

    res.status(201).json({
      message: "Admin registered successfully",
      user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};



// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("LOGIN REQUEST:", req.body);

    // FIND USER
    const user = await User.findOne({
      where: { username }
    });

    // ✅ FIX: CHECK USER FIRST
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }

    let assignedClass = null;

    if (user.role === "teacher") {
      const Teacher = require("../models/Teacher");

      const teacher = await Teacher.findOne({
        where: { userId: user.id }
      });

      assignedClass = teacher?.assignedClass || null;
    }

    console.log("FOUND USER:", user);

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }

    // JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        assignedClass
      }
    });

  } catch (error) {
    console.log("LOGIN ERROR", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


// ==========================
// FORGOT PASSWORD
// ==========================
exports.forgotPassword =
  async (req, res) => {

    try {

      const { email } = req.body;

      // FIND USER
      const user =
        await User.findOne({

          where: { email }

        });

      if (!user) {

        return res.status(404).json({

          message:
            "Not a registered email"

        });

      }

      // GENERATE TOKEN
      const resetToken =
        crypto
          .randomBytes(32)
          .toString("hex");

      // EXPIRY
      const resetTokenExpiry =
          Date.now() + 3600000;

      // SAVE TOKEN
      user.resetToken =
        resetToken;

      user.resetTokenExpiry =
        resetTokenExpiry;

      await user.save();

      // RESET LINK
      const resetLink =

        `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

      // SEND EMAIL
      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to: user.email,

        subject:
          "Password Reset Request",

        html: `

          <h2>Password Reset</h2>

          <p>
            Click the link below to reset your password:
          </p>

          <a href="${resetLink}">
            ${resetLink}
          </a>

          <p>
            This link expires in 1 hour.
          </p>

        `

      });

      res.status(200).json({

        message:
          "Password reset link sent successfully"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message: "Server Error"

      });

    }

  };


// ==========================
// RESET PASSWORD
// ==========================
exports.resetPassword =
  async (req, res) => {

    try {

      const { token } =
        req.params;

      const { password } =
        req.body;

      // FIND USER
      const user =
        await User.findOne({

          where: {

            resetToken: token

          }

        });

      if (!user) {

        return res.status(400).json({

          message:
            "Invalid reset token"

        });

      }

      // CHECK EXPIRY
      if (
          user.resetTokenExpiry <
          Date.now()
        ) {

        return res.status(400).json({

          message:
            "Reset token expired"

        });

      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // UPDATE PASSWORD
      user.password =
        hashedPassword;

      // CLEAR TOKEN
      user.resetToken = null;

      user.resetTokenExpiry = null;

      await user.save();

      res.status(200).json({

        message:
          "Password reset successful"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message: "Server Error"

      });

    }

  };


// ==========================
// GET ALL ADMINS
// ==========================
exports.getAdmins = async (req, res) => {

  try {

    const admins = await User.findAll({

      where: {
        role: ["admin", "superadmin"]
      },

      attributes: [
        "id",
        "username",
        "email",
        "role",
        "createdAt"
      ],

      order: [["createdAt", "DESC"]]

    });

    res.status(200).json(admins);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// ==========================
// UPDATE ADMIN
// ==========================
exports.updateAdmin =
  async (req, res) => {

    try {

      const { id } = req.params;

      const {
        username,
        email,
        password
      } = req.body;

      const admin =
        await User.findByPk(id);

      if (!admin) {

        return res.status(404).json({
          message: "Admin not found"
        });

      }

      admin.username = username;

      admin.email = email;

      if (password) {

        const hashedPassword =
          await bcrypt.hash(
            password,
            10
          );

        admin.password =
          hashedPassword;

      }

      await admin.save();

      res.status(200).json({

        message:
          "Admin updated successfully"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  };



// ==========================
// DELETE ADMIN
// ==========================
exports.deleteAdmin = async (req, res) => {

  try {

    const { id } = req.params;

    const admin =
      await User.findByPk(id);

    if (!admin) {

      return res.status(404).json({
        message: "Admin not found"
      });

    }

    // PREVENT SUPERADMIN DELETE
    if (admin.role === "superadmin") {

      return res.status(403).json({
        message:
          "Super Admin cannot be deleted"
      });

    }

    await admin.destroy();

    res.status(200).json({
      message: "Admin deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// ==========================
// CHANGE PASSWORD
// ==========================
exports.changePassword =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const {
        oldPassword,
        newPassword
      } = req.body;

      // FIND USER
      const user =
        await User.findByPk(
          userId
        );

      if (!user) {

        return res.status(404).json({

          message:
            "User not found"

        });

      }

      // CHECK OLD PASSWORD
      const isMatch =
        await bcrypt.compare(

          oldPassword,

          user.password

        );

      if (!isMatch) {

        return res.status(400).json({

          message:
            "Old password is incorrect"

        });

      }

      // HASH NEW PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      res.status(200).json({

        message:
          "Password changed successfully"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"

      });

    }

  };