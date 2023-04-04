import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const templateHtml = () => {
  const imgUrl = "https://raw.githubusercontent.com/Eghizio/express-intro/main/src/public/meme.png";
  const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return `
  <h1 style='color:red'>Hello there 😎</h1>
  <div>
    <a href='${link}'>YOU WON 1 MILLION DOLLARS! GET IT NOW!</a>
  </div>
  <img src='${imgUrl}' alt='meme' />`
};

// https://ethereal.email/
const getAuth = () => {
  const etherealAuth = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PWD,
  };

  if (etherealAuth.user && etherealAuth.pass) return etherealAuth;

  return nodemailer.createTestAccount();
};


const auth = await getAuth();
console.log({ auth });

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth,
});


export const sendMail = async (mailOptions) => {
  // const info = await transporter.sendMail({
  //   from: { name: "Kuba 😎", address: "foo@example.com" },
  //   to: ["bar@example.com", "baz@example.com"],
  //   subject: `Hello ✔ ${new Date().toISOString()}`,
  //   text: "Hello there 😎",
  //   html: templateHtml(),
  // });

  const info = await transporter.sendMail(mailOptions);
  const previewUrl = nodemailer.getTestMessageUrl(info);

  console.log(`Email sent: ${info.messageId}`, { info });
  console.log(`Preview URL: ${previewUrl}`);

  return info;
};
