import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import config from "@/lib/config";

//configuration for nodemailer transporter, configured to use brevo on a certain port
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: config.env.brevo.brevoLogin, // SMTP login
    pass: config.env.brevo.masterPassword, // SMTP master password
  },
});

// This route handles sending emails.
// It uses nodemailer to send an email with the provided email, subject, and message.
// The email is sent using the transporter configured with Brevo SMTP settings.
// It returns a JSON response indicating success or failure of the email sending operation.
// The POST method is used to handle the email sending request.
export const POST = async (request: Request) => {
  const { email, message, subject } = await request.json();
  try {
    await transporter.sendMail({
      from: "kelvinkwasi.dev@gmail.com", // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      success: false,
      message: "Email sending failed",
    });
  }
};
