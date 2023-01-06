const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// Set up the nodemailer transport object
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "edahmitchel@gmail.com",
    pass: "sovrpsdagtacyvps",
  },
  secure: true,
});

// Generate a random verification token
const generateVerificationToken = (usernam) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Send the verification email with a link
const sendVerificationEmail = (email, verificationToken, username) => {
  const verificationLink = ``;

  // Send the email with the verification link
  const mailOptions = {
    from: "edahmitchel@email.com",
    to: email,
    subject: "Verify your email",
    html: `<p>${username} Click <a href="https://classicweb.onrender.com/api/users/verify-email?token=${verificationToken}">here</a> to verify your email.</p>`,
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Verification email sent: ${info.response}`);
    }
  });
  // ...
};

module.exports = { generateVerificationToken, sendVerificationEmail };
