const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  try {
    const { name, email, phone, comments } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.dreamhost.com",
      port: process.env.EMAIL_PORT,
      secure: true, // true for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "contact@openingdoorstolife.org",
      to: "contact@openingdoorstolife.org",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${comments}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendEmail };
