const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 4444,
  secure: false,
  auth: {
      user: 'avitalev111@gmail.com',
      pass: '214389777'
  }
});

function sendEmail(from, body) {
  const mailOptions = {
      from: from,
      //' Daat Aaron 📜 <37325922656@mby.co.il>',
      to:'avitalev111@gmail.com',
      subject: "שלום תמר, יש לי שאלה בנוגע ל...",
      text: body
  };
  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail
};
