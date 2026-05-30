const nodemailer = require("nodemailer");

const sendContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      message
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, Email and Message are required"
      });
    }

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "info@grisfieldschools.com.ng",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `
    });

    res.status(200).json({
      message: "Message sent successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to send message"
    });

  }
};

module.exports = sendContactMessage;