// pages/api/subscribe.js

const sendSubscriptionEmail = async (email) => {
  // Implement your email sending logic here
  // You can use a library like Nodemailer to send emails

  // Example using Nodemailer
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    // Configure your email transport settings here
    host: 'mail.bdkltransporter.com', // Your SMTP host
    port: 465, // Your SMTP port
    secure: true, // Set to true if using a secure connection (TLS/SSL)
    auth: {
      user: 'test@bdkltransporter.com', // Your email address
      pass: 'BDKLemail', // Your email password or authentication token
    },
  });

  const mailOptions = {
    from: 'test@bdkltransporter.com',
    to: 'arhossainim@gmail.com',
    subject: 'New email subscription',
    text: `New email subscription: ${email}`,
  };

  await transporter.sendMail(mailOptions);
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Save the email to your database or perform any other necessary operations

    // Send the email
    try {
      await sendSubscriptionEmail(email);
      res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
      console.error('An error occurred', error);
      res.status(500).json({ message: 'Subscription failed' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
