const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'tamarsilver3@gmail.com',
    pass: '214389777'
  }
});

function sendEmail(to, body) {
  const mailOptions = {
      from: ' Daat Aaron 📜 <tamarsilver3@gmail.com>',
      to: to,
      subject: "hello ",
      text: body
  };
  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail
};
