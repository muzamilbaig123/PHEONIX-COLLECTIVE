import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    address2,
    city,
    state,
    zipCode,
    businessName,
  } = await req.json();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Request Assistance from Pheonix Collective",
      html: `
        <h1>Request Assistance from Pheonix Collective</h1>
        <p><strong>Full Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Address 2:</strong> ${address2}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>Zip Code:</strong> ${zipCode}</p>
        <p><strong>Business Name:</strong> ${businessName}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Email sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        message: "Error sending email",
      },
      { status: 500 }
    );
  }
}
