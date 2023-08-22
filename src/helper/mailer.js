import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';
import connectDB from '@/config/db';

export async function sendMail(email, emailType, userId) {
    await connectDB();
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 300000 });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 300000 });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "50e16d29ef8e1d",
                pass: "f73c98d639acce",
            },
        });

        const mailOptions = {
            from: 'aditya@rankfast.co',
            to: email,
            subject: emailType === "VERIFY" ? 'Verify Your Email' : emailType === "RESET" ? 'Reset Your Password' : '',
            html: `<p>Click <a href='${process.env.DOMAIN}/verify-email?token=${hashedToken}'>here</a> to ${emailType === "VERIFY" ? 'verify your email.' : emailType === "RESET" ? 'reset your password.' : ""}</p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error) {
        throw new Error(error.message);
    }
}