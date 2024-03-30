const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
    //create a transporter
    console.log(option)
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host: process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: "gmail", // sender address
        to: option.email, // list of receivers
        subject: option.subject, // Subject line
        // html: '<p>Your html here</p>'// plain text body
        text: option.message
    };

    await transporter.sendMail(mailOptions);

}


module.exports = sendEmail;