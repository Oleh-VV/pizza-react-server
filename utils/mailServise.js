import nodemailer from "nodemailer";
export const sendMail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
  const options = {
    from: process.env.SMTP_USER,
    to,
    subject: "Activation accaunt on " + process.env.API_URL,
    text: "Enter link below to activate your accaunt",
    html: `<div><h1>For activation your accaunt enter the link</h1><a href="${link}">${link}</a></div>`,
  };
  await transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("email sent");
      console.log(info);
    }
  });
};
