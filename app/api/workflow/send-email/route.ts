import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "894a4c001@smtp-brevo.com", // generated brevo user
      pass: "NOxzI1EkXfY2S8Rr", // generated brevo password
    },
  });

export const POST = async (request: Request) => {
    const { email, message, subject } = await request.json();
    try {
        await transporter.sendMail({
            from: "kelvinkwasi.dev@gmail.com", // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
        });
    

        return NextResponse.json({success: true, message: "Email sent successfully"});
    }
    catch (error) {
        console.error("Error sending email:", error);
       return NextResponse.json({success: false, message: "Email sending failed"});
    }
}
