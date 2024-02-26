const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.post('/contact', async (req, res) => {
  try {
    const { name, email, needHelp, message } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.Email,
        pass: process.env.Password,
      },
    });

    let info = await transporter.sendMail({
      from: '"Your Website" <abhiraj.srivast254@gmail.com>',
      to: 'abhiraj.srivast254@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nNeed Help: ${needHelp}\nMessage: ${message}`,
    });

    console.log('Message sent: %s', info.messageId);

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);

    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
