const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Student = require("../models/Student");
const User = require("../models/user");

const sequelize = require("../config/db");

const generateStudentRegNumber = require(
  "../utils/generateStudentRegNumber"
);

const {
  encryptCredential
} = require("../utils/credentialEncryption");


// CREATE STUDENT
exports.createStudent = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      fullName,
      admissionNumber,
      dob,
      gender,
      address,
      contact1,
      contact2,
      currentClass
    } = req.body;

    const passport = req.file
      ? req.file.filename
      : null;

    // GET LAST STUDENT
    const lastStudent = await Student.findOne({
      order: [["id", "DESC"]],
      transaction
    });

    // NEXT NUMBER
    let nextNumber = 1;

    if (lastStudent) {
      nextNumber = lastStudent.id + 1;
    }

    // FORMAT NUMBER
    const paddedNumber = String(nextNumber).padStart(4, "0");

    // GENERATE REG NUMBER
    const regNumber = `GFS-STD-2026-${paddedNumber}`;

    // STUDENT PORTAL USERNAME
    const username = regNumber;

    // GENERATE RANDOM PORTAL PASSWORD
    const portalPassword =
      crypto.randomBytes(6).toString("base64url");

    // HASH PASSWORD FOR LOGIN
    const hashedPassword = await bcrypt.hash(
      portalPassword,
      10
    );

    // ENCRYPT PASSWORD FOR AUTHORIZED ADMIN VIEWING
    const encryptedCredential =
      encryptCredential(portalPassword);

    // CREATE USER ACCOUNT
    const user = await User.create(
      {
        username,
        password: hashedPassword,
        role: "student",
        portalCredential: encryptedCredential
      },
      {
        transaction
      }
    );

    // CREATE STUDENT
    const student = await Student.create(
      {
        userId: user.id,
        regNumber,
        admissionNumber,
        passport,
        fullName,
        dob,
        gender,
        address,
        contact1,
        contact2,
        currentClass
      },
      {
        transaction
      }
    );

    // COMPLETE BOTH CREATIONS
    await transaction.commit();

    return res.status(201).json({
      message: "Student and portal account created successfully",

      student,

      credentials: {
        username,
        password: portalPassword
      }
    });

  } catch (error) {
    await transaction.rollback();

    console.log(error);

    return res.status(500).json({
      message:
        error.message ||
        "Failed to create student account"
    });
  }
};



// GET ALL STUDENTS
exports.getStudents = async (req, res) => {

  try {

    const students = await Student.findAll({

      where: {
        status: "ACTIVE"
      },

      order: [["fullName", "ASC"]]

    });

    res.status(200).json(students);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// GET SINGLE STUDENT
exports.getSingleStudent = async (req, res) => {

  try {

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }

    res.status(200).json(student);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// UPDATE STUDENT
exports.updateStudent =
  async (req, res) => {

    try {

      const { id } =
        req.params;


      const student =
        await Student.findByPk(id);

      if (!student) {

        return res.status(404).json({
          message: "Student not found"
        });

      }


      const {

        fullName,

        admissionNumber,

        dob,

        gender,

        address,

        contact1,

        contact2,

        currentClass

      } = req.body;


      student.fullName =
        fullName;

      student.admissionNumber =
        admissionNumber;

      student.dob =
        dob;

      student.gender =
        gender;

      student.address =
        address;

      student.contact1 =
        contact1;

      student.contact2 =
        contact2;

      student.currentClass =
        currentClass;


      // UPDATE PASSPORT
      if (req.file) {

        student.passport =
          req.file.filename;

      }


      await student.save();


      res.status(200).json({

        message:
          "Student updated successfully",

        student

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };


// DELETE STUDENT
exports.deleteStudent = async (req, res) => {

  try {

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }

    await student.destroy();

    res.status(200).json({
      message: "Student deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// GET STUDENTS BY CLASS
exports.getStudentsByClass = async (
  req,
  res
) => {

  try {

    const { classId } =
      req.params;

    const students =
      await Student.findAll({

        where: {
          currentClass: classId,
          status: "ACTIVE"
        },

        order: [["fullName", "ASC"]]

      });

    res.status(200).json(
      students
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


//DEACTIVATE STUDENT
exports.deactivateStudent = async (req, res) => {

  try {

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }

    student.status = "INACTIVE";

    await student.save();

    res.status(200).json({
      message: "Student deactivated successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// ACTIVATE STUDENT
exports.activateStudent = async (req, res) => {

  try {

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }

    student.status = "ACTIVE";

    await student.save();

    res.status(200).json({
      message: "Student activated successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};