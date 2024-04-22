import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  authMethod: 'PLAIN'
});

// Create Mailgen instance
const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: 'https://mailgen.js/'
  }
});

// Define the registerMail function to send registration emails
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // Generate email content
  const emailContent = {
    body: {
      name: username,
      intro: text || 'Welcome to our platform! We\'re excited to have you join us.',
      outro: 'Need help or have questions? Feel free to reply to this email.'
    }
  };

  // Generate HTML email using Mailgen
  const emailBody = MailGenerator.generate(emailContent);

  // Configure the email message
  const message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject || "Welcome to Our Platform",
    html: emailBody
  };

  try {
    // Send the email
    const info = await transporter.sendMail(message);
    console.log("Email sent: %s", info.messageId);
    return res.status(200).send({ msg: "You should receive an email from us." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).send({ error });
  }
};
