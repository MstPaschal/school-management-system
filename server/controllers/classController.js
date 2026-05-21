const Class = require("../models/Class");


// CREATE CLASS
exports.createClass = async (req, res) => {

  try {

    const { className } = req.body;

    // CHECK EXISTING
    const existingClass = await Class.findOne({
      where: { className }
    });

    if (existingClass) {

      return res.status(400).json({
        message: "Class already exists"
      });

    }

    // CREATE
    const newClass = await Class.create({
      className
    });

    res.status(201).json({
      message: "Class created successfully",
      newClass
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// GET ALL CLASSES
exports.getClasses = async (req, res) => {

  try {

    const classes = await Class.findAll({
      order: [["className", "ASC"]]
    });

    res.status(200).json(classes);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// DELETE CLASS
exports.deleteClass = async (req, res) => {

  try {

    const { id } = req.params;

    const foundClass = await Class.findByPk(id);

    if (!foundClass) {

      return res.status(404).json({
        message: "Class not found"
      });

    }

    await foundClass.destroy();

    res.status(200).json({
      message: "Class deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};