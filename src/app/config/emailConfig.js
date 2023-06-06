const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'edsonhrf@gmail.com',
    pass: 'twdnsfqzbwdatrak'
  }
});

module.exports = transporter;
