import { Router } from "express";
import jwt from "jsonwebtoken";
import { adminLoginSchema, forgotPasswordSchema, resetPasswordSchema } from "../../shared/schema";
import { storage } from "../storage";
import { sendSecureOtpEmail } from "../emailService";
import { sendGridService } from "../sendgridService";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

// Authentication middleware
const authenticateAdmin = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const admin = await storage.getAdminByEmail(decoded.email);
    
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = adminLoginSchema.parse(req.body);
    const admin = await storage.validateAdminPassword(email, password);
    
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: admin.email, id: admin.id },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      token,
      admin: { id: admin.id, email: admin.email }
    });
  } catch (error: any) {
    console.error("Admin login error:", error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: "Invalid login data", errors: error.errors });
    }
    res.status(500).json({ message: "Login failed" });
  }
});

// Admin request reset password - generate OTP
router.post("/request-reset", async (req, res) => {
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
});

// Admin reset password with OTP
router.post("/reset-password", async (req, res) => {
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
});

// Get all messages (admin only) with enhanced pagination and search
router.get("/messages", authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string || "";
    const status = req.query.status as string || "all"; // all, read, unread
    
    console.log(`Admin messages request - Page: ${page}, Limit: ${limit}, Search: "${search}", Status: ${status}`);
    
    const result = await storage.getMessages(page, limit, search, status);
    
    console.log(`Messages retrieved: ${result.messages.length} messages, Total: ${result.total}`);
    console.log('Sample messages:', result.messages.slice(0, 3).map(m => ({
      id: m.id,
      name: m.name,
      email: m.email,
      phone: m.phone,
      subject: m.subject
    })));
    
    res.json(result);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// Mark message as read (admin only)
router.patch("/messages/:id/read", authenticateAdmin, async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    if (isNaN(messageId)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    
    await storage.markMessageAsRead(messageId);
    res.json({ success: true, message: "Message marked as read" });
  } catch (error) {
    console.error("Mark message read error:", error);
    res.status(500).json({ message: "Failed to mark message as read" });
  }
});

// Delete message (admin only)
router.delete("/messages/:id", authenticateAdmin, async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    console.log(`Delete request received for message ID: ${messageId}`);
    
    if (isNaN(messageId)) {
      console.log("Invalid message ID provided:", req.params.id);
      return res.status(400).json({ 
        success: false, 
        message: "Invalid message ID" 
      });
    }
    
    console.log(`Attempting to delete message with ID: ${messageId}`);
    await storage.deleteMessage(messageId);
    console.log(`Message ${messageId} successfully deleted from database`);
    
    res.json({ 
      success: true, 
      message: "Message deleted successfully" 
    });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete message" 
    });
  }
});

// Verify admin token
router.get("/verify", authenticateAdmin, async (req: any, res) => {
  res.json({ 
    success: true, 
    admin: { id: req.admin.id, email: req.admin.email } 
  });
});

export default router;