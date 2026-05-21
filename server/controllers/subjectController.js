const Subject = require("../models/Subject");


// CREATE SUBJECT
exports.createSubject = async (req, res) => {

  try {

    const { subjectName } = req.body;

    const existingSubject = await Subject.findOne({
      where: { subjectName }
    });

    if (existingSubject) {

      return res.status(400).json({
        message: "Subject already exists"
      });

    }

    const newSubject = await Subject.create({
      subjectName
    });

    res.status(201).json({
      message: "Subject created successfully",
      newSubject
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// GET SUBJECTS
exports.getSubjects = async (req, res) => {

  try {

    const subjects = await Subject.findAll({
      order: [["subjectName", "ASC"]]
    });

    res.status(200).json(subjects);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// DELETE SUBJECT
exports.deleteSubject = async (req, res) => {

  try {

    const { id } = req.params;

    const foundSubject = await Subject.findByPk(id);

    if (!foundSubject) {

      return res.status(404).json({
        message: "Subject not found"
      });

    }

    await foundSubject.destroy();

    res.status(200).json({
      message: "Subject deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};