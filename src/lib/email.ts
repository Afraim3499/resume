// Email service utilities
// This file can be extended to support multiple email providers

export interface EmailData {
  to: string;
  from: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(data: EmailData): Promise<void> {
  // This is a placeholder implementation
  // Replace with actual email service integration (Resend, Nodemailer, etc.)

  if (process.env.RESEND_API_KEY) {
    // Resend integration example
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send(data);
  } else if (process.env.SMTP_HOST) {
    // Nodemailer integration example
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail(data);
  } else {
    // Fallback: log to console in development
    console.log("Email would be sent:", data);
  }
}

export function formatContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): EmailData {
  return {
    to: process.env.CONTACT_EMAIL || "afraim.afraim99@gmail.com",
    from: "Portfolio Contact <noreply@yourdomain.com>",
    subject: `Portfolio Contact: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1f2937; }
            .value { color: #4b5563; }
            .message { background: white; padding: 15px; border-radius: 4px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${data.subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="message">${data.message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    replyTo: data.email,
  };
}

