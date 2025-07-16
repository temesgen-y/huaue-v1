import { VercelRequest, VercelResponse } from '@vercel/node';
import { resetPasswordSchema } from "../../shared/schema";
import { storage } from "../../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, otp, newPassword } = resetPasswordSchema.parse(req.body);
    const success = await storage.resetAdminPassword(email, otp, newPassword);
    
    if (success) {
      res.json({ 
        success: true, 
        message: "Password reset successful. You can now login with your new password."
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: "Invalid or expired OTP. Please request a new reset link."
      });
    }
  } catch (error: any) {
    console.error("Password reset error:", error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: "Invalid reset data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to reset password" });
  }
}