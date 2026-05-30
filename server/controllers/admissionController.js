const AdmissionApplication =
  require(
    "../models/AdmissionApplication"
  );

const transporter =
  require("../config/mailer");


// ==========================
// SUBMIT APPLICATION
// ==========================
exports.submitApplication =
  async (req, res) => {

    try {

      const application =
        await AdmissionApplication.create(
          req.body
        );

      res.status(201).json({
        message:
          "Application submitted successfully",
        application
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };


// ==========================
// GET ALL APPLICATIONS
// ==========================
exports.getApplications =
  async (req, res) => {

    try {

      const applications =
        await AdmissionApplication.findAll({

          order: [
            ["createdAt", "DESC"]
          ]

        });

      res.status(200).json(
        applications
      );

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };


// ==========================
// ACCEPT APPLICATION
// ==========================
exports.bulkAccept =
  async (req,res) => {

    const {
      ids,
      examDate,
      examTime
    } = req.body;

    const applications =
      await AdmissionApplication.findAll({

        where:{
          id: ids
        }

      });

    for (
      const app
      of applications
    ) {

      app.status =
        "ACCEPTED";

      app.examDate =
        examDate;

      app.examTime =
        examTime;

      await app.save();

      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to:
          app.email,

        subject:
          "Entrance Examination Invitation",

        html: `
          Dear Parent,

          Your child has been invited
          for entrance examination.

          Date:
          ${examDate}

          Time:
          ${examTime}

          Please come with all the necessary
          writing materials needed for the exam.

          Subjects: English Language and Essay
          Writing, Mathematics, General Knowledge.

          Venue: Grisfield Schools Campus 2
          Address: Plot 107 Gracious Estate,
          Otigba Nkwelle Ezunaka, Anambra State.
        `

      });

    }

    res.json({

      success:true,

      message:
        "Invitations sent"

    });

  };


// ==========================
// REJECT APPLICATION
// ==========================
exports.rejectApplication =
  async (req, res) => {

    try {

      const application =
        await AdmissionApplication.findByPk(
          req.params.id
        );

      if (!application) {

        return res.status(404).json({
          message:
            "Application not found"
        });

      }

      application.status =
        "REJECTED";

      await application.save();

      res.status(200).json({
        message:
          "Application rejected"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };