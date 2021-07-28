const nodemailer = require('nodemailer')
const config = require('../config/config');

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = config.emailFrom}) {
  const transporter = nodemailer.createTransport(config.smtpOption)
  await transporter.sendMail({ from, to, subject, html })  
}