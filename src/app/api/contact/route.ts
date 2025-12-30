import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const validatedData = result.data;

    // Here you would integrate with your email service
    // For now, we'll use a simple approach that can be enhanced with Resend/Nodemailer

    // Example: Send email using Resend (uncomment when API key is configured)
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: "Portfolio <contact@yourdomain.com>",
      to: process.env.CONTACT_EMAIL || "your-email@example.com",
      subject: `Portfolio Contact: ${validatedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: validatedData.email,
    });
    */

    // For now, just log the data (replace with actual email sending)
    console.log("Contact form submission:", validatedData);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

