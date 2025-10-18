const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendingMail( from, subject, text, html) {
  const info = await transporter.sendMail({
    from,
    to: "connect@mindcruize.com",
    subject,
    text,
    html
  });
}

module.exports = sendingMail;