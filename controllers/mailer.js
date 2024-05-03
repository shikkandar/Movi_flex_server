import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import env from 'dotenv';

env.config();

// Define the registerMail function to send registration emails
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;
  
  // Check if userEmail, username, text, and subject are provided
  if (!userEmail || !username || !text || !subject) {
    return res.status(400).json({ error: "Username, email address, text, and subject are required." });
  }
  
  const config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };
  
  const transporter = nodemailer.createTransport(config);
  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });
  
  const response = {
    body: {
      name: "Movi flex",
      intro: text, // Use the text provided in the request as the intro
      outro: "Looking forward to doing more business.",
    },
  };

  const mail = MailGenerator.generate(response);
  
  const message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject,
    html: mail,
  };
  
  transporter.sendMail(message)
    .then(() => {
      return res.status(201).json({ msg: "Email sent successfully" });
    })
    .catch((err) => {
      console.error("Error sending email:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    });
};
