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
exports.acceptApplication =
  async (req, res) => {

    try {

      const {
        examDate,
        examTime
      } = req.body;

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
        "ACCEPTED";

      application.examDate =
        examDate;

      application.examTime =
        examTime;

      await application.save();


      // SEND EMAIL
      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to:
          application.email,

        subject:
          "Entrance Examination Invitation",

        html: `
          <h2>
            GRISFIELD SCHOOLS
          </h2>

          <p>
            Dear Parent,
          </p>

          <p>
            Your child's admission application
            has been accepted.
          </p>

          <p>
            You are invited for entrance examination.
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
            Grisfield Schools Campus
          </p>

          <p>
            Thank you.
          </p>
        `

      });

      res.status(200).json({
        message:
          "Application accepted and email sent"
      });

    } catch (error) {

        console.error(
            "EMAIL ERROR:",
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