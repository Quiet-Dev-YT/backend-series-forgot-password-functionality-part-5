const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth:{
        user:process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

const SendResetEmail = async(to, reset_link) => {
    await transporter.sendMail({
        from : `Support ${process.env.SMTP_USER}`,
        to,
        subject: 'Reset Password Request',
        html: `
        <h3>Reset Password Request</h3>
        <p>Click the link below to reset your password</p>
        <p>this link will expire in <strong>15</strong> minutes </p>
        <a href="${reset_link} target="_blank" >${reset_link}</a>
        `
    })
}

module.exports = SendResetEmail