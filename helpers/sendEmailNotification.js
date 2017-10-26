import nodemailer from 'nodemailer';

/**
 * Function for sending email notification to users
 * @param {object} mailOptions email data including user's email,
 * message body and message content
 * @return {void}
 */
const sendEmailNotification = (email, options) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // secure:true for port 465, secure:false for port 587
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

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    return `Email sent: ${info.response}`;
  });
};

export default sendEmailNotification;
