import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email address", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const validatedData = result.data;

    // Here you would integrate with your email service (Resend, Mailchimp, etc.)
    // For now, we'll use a simple approach that can be enhanced

    // Example: Add to Resend audience (uncomment when API key is configured)
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.contacts.create({
      email: validatedData.email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
    */

    // For now, just log the data (replace with actual newsletter service)
    console.log("Newsletter subscription:", validatedData.email);

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

