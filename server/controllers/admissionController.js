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
exports.bulkAccept = async (req, res) => {

  try {

    const {
      ids,
      examDate,
      examTime
    } = req.body;

    console.log("REQUEST BODY:", req.body);

    if (!ids || ids.length === 0) {

      return res.status(400).json({
        message: "No students selected"
      });

    }

    const applications =
      await AdmissionApplication.findAll({
        where: {
          id: ids
        }
      });

    console.log(
      "Applications Found:",
      applications.length
    );

    for (const app of applications) {

      app.status = "ACCEPTED";

      app.examDate = examDate;

      app.examTime = examTime;

      await app.save();

      console.log(
        "Sending mail to:",
        app.email
      );

      const info =
        await transporter.sendMail({

          from:
            process.env.EMAIL_USER,

          to:
            app.email,

          subject:
            "Entrance Examination Invitation",

          html: `
            <h2>GRISFIELD SCHOOLS</h2>

            <p>Dear Parent,</p>

            <p>
              Your child's admission application
              has been accepted.
            </p>

            <p>
              Entrance Examination Details:
            </p>

            <p>
              <strong>Date:</strong>
              ${examDate}
            </p>

            <p>
              <strong>Time:</strong>
              ${examTime}
            </p>

            <p>
              Venue:
              Grisfield Schools Campus 2
            </p>

            <p>
              Plot 107 Gracious Estate,
              Otigba Nkwelle Ezunaka,
              Anambra State.
            </p>
          `

        });

      console.log(
        "Mail Sent:",
        info.response
      );

    }

    res.status(200).json({

      success: true,

      message:
        "Invitations sent successfully"

    });

  } catch (error) {

    console.log(
      "BULK ACCEPT ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

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