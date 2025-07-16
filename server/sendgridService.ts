import { MailService, MailDataRequired } from '@sendgrid/mail';

class SendGridService {
  private mailService: MailService;
  private isConfigured: boolean = false;

  constructor() {
    this.mailService = new MailService();
    this.configure();
  }

  private configure() {
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      console.log('SendGrid API key not provided - email service disabled');
      this.isConfigured = false;
      return;
    }

    try {
      this.mailService.setApiKey(apiKey);
      this.isConfigured = true;
      console.log('SendGrid service configured successfully');
    } catch (error) {
      console.error('Failed to configure SendGrid:', error);
      this.isConfigured = false;
    }
  }

  async sendOtpEmail(email: string, otpCode: string): Promise<boolean> {
    if (!this.isConfigured) {
      console.log(`SendGrid disabled - OTP for ${email}: ${otpCode}`);
      return false;
    }

    try {
      const emailParams: MailDataRequired = {
        to: email,
        from: 'noreply@huayueplasticsindustry.com', // This should be verified in SendGrid
        subject: 'Admin Password Reset - OTP Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #1DB954; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">HUAYUE PLASTICS INDUSTRY</h1>
              <p style="margin: 10px 0 0 0;">Admin Password Reset</p>
            </div>
            
            <div style="padding: 30px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
              <h2 style="color: #333; margin-top: 0;">Password Reset Request</h2>
              <p style="color: #666; line-height: 1.6;">
                You have requested to reset your admin password. Please use the following 6-digit code to complete the password reset process:
              </p>
              
              <div style="background-color: #fff; border: 2px solid #1DB954; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #1DB954; margin: 0; font-size: 24px; letter-spacing: 3px;">
                  ${otpCode}
                </h3>
              </div>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                This code will expire in 15 minutes for security reasons. If you did not request this password reset, please ignore this email.
              </p>
              
              <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px;">
                <p style="color: #856404; margin: 0; font-size: 14px;">
                  <strong>Security Notice:</strong> Never share this code with anyone. HUAYUE PLASTICS INDUSTRY staff will never ask for your password or OTP code.
                </p>
              </div>
            </div>
            
            <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
              <p style="margin: 0;">
                © 2025 HUAYUE PLASTICS INDUSTRY PLC. All rights reserved.
              </p>
            </div>
          </div>
        `,
        text: `
HUAYUE PLASTICS INDUSTRY - Admin Password Reset

You have requested to reset your admin password. Please use the following 6-digit code to complete the password reset process:

OTP Code: ${otpCode}

This code will expire in 15 minutes for security reasons. If you did not request this password reset, please ignore this email.

Security Notice: Never share this code with anyone. HUAYUE PLASTICS INDUSTRY staff will never ask for your password or OTP code.

© 2025 HUAYUE PLASTICS INDUSTRY PLC. All rights reserved.
        `
      };

      await this.mailService.send(emailParams);
      console.log(`OTP email sent successfully to ${email}`);
      return true;
    } catch (error) {
      console.error('Failed to send OTP email:', error);
      return false;
    }
  }

  isReady(): boolean {
    return this.isConfigured;
  }
}

export const sendGridService = new SendGridService();