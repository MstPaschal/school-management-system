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

    if (
      !ids ||
      ids.length === 0
    ) {

      return res.status(400).json({
        success: false,
        message: "No students selected"
      });

    }

    const applications =
      await AdmissionApplication.findAll({

        where: {
          id: ids
        }

      });

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
              Your child has been invited
              for entrance examination.
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
              Endeavour to come with your
              complete writing materials
            </p>
            
            <p>
              Venue:
              Grisfield Schools Campus 2
            </p>

            <p>
              Plot 107 Gracious Estate,
              Nkwelle Ezunaka,
              Anambra State.
            </p>

            <p>
              Subjects:
              English Language,
              Mathematics,
              General Knowledge.
            </p>
          `

        });

      console.log(
        "Mail sent:",
        info.messageId
      );

    }

    return res.status(200).json({

      success: true,

      message:
        `${applications.length} invitation(s) sent successfully`

    });

  } catch (error) {

    console.log(
      "BULK ACCEPT ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message

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