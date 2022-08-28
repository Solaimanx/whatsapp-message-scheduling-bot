const apitoken = process.env.SENDGRID_API;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(apitoken);

var NumberOfEmailSent = 0;

const sendEmail = async ({ subject, message, file }) => {
  const msg = {
    to: "solaiman321@gmail.com",
    from: " אסף (פלואו לימוד אנגלית) <info@english21days.co.il>",
    subject: `${subject} Whatsapp Software Email`,
    text: message,
  };

  if (file) {
    msg["attachments"] = [
      {
        filename: "qrImage.png",
        type: "image/png",
        content: file,
      },
    ];
  }


  await sgMail.send(msg, function (err, info) {
    if (err) {
      console.log(`Email Not Sent Error Occured => ${err}`);
    } else {
      console.log(`Email was Sent${NumberOfEmailSent}`);
      NumberOfEmailSent++;
    }
  });
};

module.exports = { sendEmail };
