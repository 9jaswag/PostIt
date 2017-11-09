import nodemailer from 'nodemailer';

/**
 * Function for sending email notification to users
 * @param {string} email - email the message is to be sent to
 * @param {object} options email data including user's email,
 * message body and message content
 * @return {void}
 */
const sendEmailNotification = (email, options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: 'PostIT',
    to: email,
    subject: options.subject,
    html: options.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    return `Email sent: ${info.response}`;
  });
};

export default sendEmailNotification;
