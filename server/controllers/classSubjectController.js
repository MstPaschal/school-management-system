const ClassSubject =
require("../models/ClassSubject");

const Subject =
require("../models/Subject");


// ASSIGN SUBJECT
exports.assignSubject =
async (req, res) => {

  try {

    const {
      classId,
      subjectId
    } = req.body;

    // CHECK EXISTING
    const existing =
      await ClassSubject.findOne({

        where: {
          classId,
          subjectId
        }

      });

    if (existing) {

      return res.status(400).json({

        message:
          "Subject already assigned to class"

      });

    }

    await ClassSubject.create({

      classId,
      subjectId

    });

    res.status(201).json({

      message:
        "Subject assigned successfully"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server error"

    });

  }

};


// GET CLASS SUBJECTS
exports.getClassSubjects =
async (req, res) => {

  try {

    const { classId } =
      req.params;

    const subjects =
      await ClassSubject.findAll({

        where: {
          classId
        },

        include: [

          {
            model: Subject
          }

        ]

      });

    res.json(subjects);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server error"

    });

  }

};


// REMOVE SUBJECT
exports.removeSubject =
async (req, res) => {

  try {

    const {
      classId,
      subjectId
    } = req.params;

    await ClassSubject.destroy({

      where: {
        classId,
        subjectId
      }

    });

    res.json({

      message:
        "Subject removed successfully"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server error"

    });

  }

};