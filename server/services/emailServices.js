const transporter = require("../utils/emails");

const sendVerificationEmail = async (email, token) => {

    const verificationLink =
        `${process.env.CLIENT_URL}/verify-email/${token}`;

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Verify Your Email",

        html: `
            <h2>Welcome to AI Placement Coach</h2>

            <p>Please verify your email by clicking the button below.</p>

            <a href="${verificationLink}">
                Verify Email
            </a>
        `

    });

};

module.exports = {
    sendVerificationEmail
};