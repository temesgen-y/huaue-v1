import { VercelRequest, VercelResponse } from '@vercel/node';
import { forgotPasswordSchema } from "../../shared/schema";
import { storage } from "../../server/storage";
import { sendSecureOtpEmail } from "../../server/emailService";
import { sendGridService } from "../../server/sendgridService";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = forgotPasswordSchema.parse(req.body);
    const otpCode = await storage.generateOtpCode(email);
    
    if (!otpCode) {
      return res.status(404).json({ message: "Admin with this email not found" });
    }

    // Try to send email via secure SMTP service first
    let emailSent = await sendSecureOtpEmail(email, otpCode);
    
    // Fallback to SendGrid if SMTP fails
    if (!emailSent) {
      emailSent = await sendGridService.sendOtpEmail(email, otpCode);
    }
    
    // Security: NEVER expose OTP in response - only send via email
    if (emailSent) {
      res.json({ 
        success: true, 
        message: "OTP sent to your email address. Check your inbox and follow the instructions."
      });
    } else {
      console.log("Development mode - OTP:", otpCode);
      res.json({ 
        success: true, 
        message: "OTP generated. Check server logs for development mode."
      });
    }
  } catch (error: any) {
    console.error("Password reset request error:", error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: "Invalid email format", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to process reset request" });
  }
}