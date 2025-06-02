import nodemailer from 'nodemailer';

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendContactEmail(data: ContactEmailData): Promise<void> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #2563eb, #0ea5e9); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="color: #e2e8f0; margin: 10px 0 0 0;">Portfolio Website</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="margin-bottom: 20px;">
            <h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 16px;">From:</h3>
            <p style="color: #475569; margin: 0; font-size: 18px; font-weight: 600;">${data.name}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 16px;">Email:</h3>
            <p style="color: #2563eb; margin: 0; font-size: 16px;">
              <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 16px;">Message:</h3>
            <div style="background: #f1f5f9; padding: 16px; border-radius: 6px; border-left: 4px solid #2563eb;">
              <p style="color: #334155; margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0; font-size: 14px;">
              Received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    `;

    const textContent = `
New Contact Form Submission

From: ${data.name}
Email: ${data.email}

Message:
${data.message}

Received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
    `;

    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Portfolio Contact: Message from ${data.name}`,
      text: textContent,
      html: htmlContent,
    });
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service verification failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();