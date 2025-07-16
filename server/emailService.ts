import nodemailer from 'nodemailer';

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  adminEmail: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private adminEmail: string;

  constructor(config: EmailConfig) {
    this.adminEmail = config.adminEmail;
    
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465, // true for 465, false for other ports
      auth: {
        user: config.user,
        pass: config.password,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendContactFormEmail(contactData: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"HUAYUE PLASTICS Website" <${contactData.email}>`,
        to: this.adminEmail,
        subject: `New Contact Message: ${contactData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="background: linear-gradient(135deg, #1DB954, #16a085); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
              <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">HUAYUE PLASTICS INDUSTRY Website</p>
            </div>
            
            <div style="padding: 30px 20px; background: #f9f9f9;">
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #1DB954;">
                  <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">Contact Information</h3>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1DB954; display: inline-block; width: 80px;">Name:</strong>
                  <span style="color: #333;">${contactData.name}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1DB954; display: inline-block; width: 80px;">Email:</strong>
                  <span style="color: #333;">${contactData.email}</span>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1DB954; display: inline-block; width: 80px;">Phone:</strong>
                  <span style="color: #333;">${contactData.phone}</span>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <strong style="color: #1DB954; display: inline-block; width: 80px;">Subject:</strong>
                  <span style="color: #333;">${contactData.subject}</span>
                </div>
                
                <div style="border-top: 1px solid #e0e0e0; padding-top: 20px;">
                  <strong style="color: #1DB954; display: block; margin-bottom: 10px;">Message:</strong>
                  <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #1DB954; color: #333; line-height: 1.6;">
                    ${contactData.message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                
                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
                  <p style="margin: 0; color: #666; font-size: 14px;">
                    This message was sent from the HUAYUE PLASTICS contact form on ${new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            <div style="background: #333; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                HUAYUE PLASTICS INDUSTRY PLC - Industrial Piping Solutions
              </p>
            </div>
          </div>
        `,
        text: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone}
Subject: ${contactData.subject}

Message:
${contactData.message}

Sent on: ${new Date().toLocaleString()}
        `
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

// Create email service instance
export const createEmailService = (): EmailService | null => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;

  // Check if all required environment variables are present
  if (!host || !user || !password || !adminEmail) {
    console.warn('Email service disabled: Missing SMTP configuration');
    return null;
  }

  const config: EmailConfig = {
    host: host!,
    port,
    user: user!,
    password: password!,
    adminEmail: adminEmail!
  };

  return new EmailService(config);
};

// Secure OTP email sending functionality for admin password reset
export async function sendSecureOtpEmail(email: string, otpCode: string): Promise<boolean> {
  // Use SMTP configuration from environment variables with cPanel defaults
  const host = process.env.SMTP_HOST || 'mail.huayueplasticsindustry.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!user || !password) {
    console.log('Secure OTP email disabled: Missing SMTP credentials');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // SSL for port 465, STARTTLS for 587
      auth: {
        user,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates for cPanel
      }
    });

    const mailOptions = {
      from: `"HUAYUE PLASTICS INDUSTRY" <${user}>`,
      to: email,
      subject: 'HUAYUE Admin Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1DB954; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">HUAYUE PLASTICS INDUSTRY</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Admin Password Reset</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">Your One-Time Password</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Your One-Time Password (OTP) for admin password reset is:
            </p>
            
            <div style="background-color: #fff; border: 3px solid #1DB954; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
              <h3 style="color: #1DB954; margin: 0; font-size: 36px; letter-spacing: 4px; font-weight: bold;">
                ${otpCode}
              </h3>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              <strong>This OTP will expire in 15 minutes.</strong> Do not share this code with anyone.
            </p>
            
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>Security Notice:</strong> HUAYUE PLASTICS INDUSTRY staff will never ask for your password or OTP code.
              </p>
            </div>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">© 2025 HUAYUE PLASTICS INDUSTRY PLC. All rights reserved.</p>
          </div>
        </div>
      `,
      text: `
HUAYUE PLASTICS INDUSTRY - Admin Password Reset

Your One-Time Password (OTP) is: ${otpCode}
It will expire in 15 minutes.
Do not share this code with anyone.

Security Notice: HUAYUE PLASTICS INDUSTRY staff will never ask for your password or OTP code.

© 2025 HUAYUE PLASTICS INDUSTRY PLC. All rights reserved.
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Secure OTP email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Failed to send secure OTP email:', error);
    return false;
  }
}