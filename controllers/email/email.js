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
    text: `Bienvenido su api key es: ${api_key}`,
    html: `<p>welcome your api key is: ${api_key}</p>`
  }

  await transporter.sendMail(newEmail, (err, result) => {
    if(err) return console.log(err)
    console.log('Mensagem enviada!!!!' + result)
  });
}

module.exports = {
  newApiKeyEmail
}