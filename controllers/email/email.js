const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Hotmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS_APP
    }
});

const newApiKeyEmail = async (email, api_key) => {
  const newEmail = {
    from: process.env.EMAIL,
    to: email,
    subject: 'UAAPI',
    text: '',
    html: `<p>Bienvenido su api key es: ${api_key}</p>`
  }

  await transporter.sendMail(newEmail, (error, result) => {
    if(error) throw new Error(error);
  });
};

const resendApiKeyEmail = async (email, api_key) => {
  const newEmail = {
    from: process.env.EMAIL,
    to: email,
    subject: 'UAAPI',
    text: '',
    html: `<p>Bienvenido otra vez!! Su api key es: ${api_key}</p>`
  }

  await transporter.sendMail(newEmail, (error, result) => {
    if(error) throw new Error(error);
  }); 
};

module.exports = {
  newApiKeyEmail,
  resendApiKeyEmail
};