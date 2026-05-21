const bcrypt = require("bcryptjs");

const Teacher = require("../models/Teacher");

const User = require("../models/User");

const generateTeacherRegNumber = require(
  "../utils/generateTeacherRegNumber"
);


// CREATE TEACHER
exports.createTeacher = async (req, res) => {

  try {

    const {
      fullName,
      dob,
      contact,
      address,
      nextOfKin,
      nokContact,
      nokAddress,
      assignedClass,
      username,
      password
    } = req.body;


    const existingUser = await User.findOne({
      where: { username }
    });

    if (existingUser) {

      return res.status(400).json({
        message: "Username already exists"
      });

    }


    const regNumber = await generateTeacherRegNumber();

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const user = await User.create({

      username,

      password: hashedPassword,

      role: "teacher"

    });


    const teacher = await Teacher.create({

        userId: user.id,

        regNumber,

        fullName,

        dob,

        contact,

        address,

        nextOfKin,

        nokContact,

        nokAddress,

        assignedClass,

        passport: req.file
          ? req.file.filename
          : null

      });


    res.status(201).json({

      message: "Teacher created successfully",

      teacher,

      user

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// GET ALL TEACHERS
exports.getTeachers = async (req, res) => {

  try {

    const teachers = await Teacher.findAll({

      include: [

        {
          model: User,
          attributes: ["username"]
        }

      ],

      order: [["fullName", "ASC"]]

    });

    res.status(200).json(teachers);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// GET SINGLE TEACHER
exports.getSingleTeacher = async (req, res) => {

  try {

    const { id } = req.params;

    const teacher = await Teacher.findByPk(id, {

        include: [

          {
            model: User,
            attributes: ["username"]
          }

        ]

      });

    if (!teacher) {

      return res.status(404).json({
        message: "Teacher not found"
      });

    }

    res.status(200).json(teacher);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// DELETE TEACHER
exports.deleteTeacher = async (req, res) => {

  try {

    const { id } = req.params;

    const teacher =
      await Teacher.findByPk(id);

    if (!teacher) {

      return res.status(404).json({
        message: "Teacher not found"
      });

    }

    // DELETE LINKED USER ACCOUNT
    if (teacher.userId) {

      await User.destroy({
        where: {
          id: teacher.userId
        }
      });

    }

    // DELETE TEACHER
    await teacher.destroy();

    res.status(200).json({
      message: "Teacher deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// UPDATE TEACHER
exports.updateTeacher = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      fullName,
      username,
      password,
      contact,
      dob,
      address,
      nextOfKin,
      nokContact,
      nokAddress,
      assignedClass
    } = req.body;

    const teacher =
      await Teacher.findByPk(id);

    if (!teacher) {

      return res.status(404).json({
        message: "Teacher not found"
      });

    }

    // UPDATE TEACHER
    await teacher.update({

      fullName,
      contact,
      dob,
      address,
      nextOfKin,
      nokContact,
      nokAddress,
      assignedClass

    });

    // UPDATE USER
    if (teacher.userId) {

      const user =
        await User.findByPk(
          teacher.userId
        );

      if (user) {

        user.username = username;

        if (password) {

          const hashedPassword =
            await bcrypt.hash(
              password,
              10
            );

          user.password =
            hashedPassword;

        }

        await user.save();

      }

    }

    res.status(200).json({
      message:
        "Teacher updated successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};