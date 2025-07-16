import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, adminLoginSchema, forgotPasswordSchema, resetPasswordSchema, insertProductSchema, insertNewsSchema } from "@shared/schema";
import jwt from "jsonwebtoken";
import { createEmailService, sendSecureOtpEmail } from "./emailService";
import { telegramService } from "./telegramService";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Initialize email service
const emailService = createEmailService();

// Middleware to verify admin authentication
const authenticateAdmin = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const admin = await storage.getAdminByEmail(decoded.email);
    
    if (!admin) {
      return res.status(401).json({ message: "Invalid authentication" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authentication" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize default admin if none exists
  try {
    const existingAdmin = await storage.getAdminByEmail("admin@huayueplasticsindustry.com");
    if (!existingAdmin) {
      await storage.createAdmin({
        name: "System Administrator",
        email: "admin@huayueplasticsindustry.com",
        passwordHash: "Admin4321!", // This will be hashed by the storage layer
      });
      console.log("Default admin created: admin@huayueplasticsindustry.com / Admin4321!");
    }
  } catch (error) {
    console.log("Admin initialization skipped:", error);
  }

  // Generate professional profile images as SVG
  app.get("/api/generate-profile/:role", (req, res) => {
    const { role } = req.params;
    
    let backgroundColor = "#1DB954";
    let initials = "";
    let name = "";
    
    switch (role) {
      case "ceo":
        initials = "AT";
        name = "Alemayehu Tadesse";
        backgroundColor = "#2563eb";
        break;
      case "cto":
        initials = "MH";
        name = "Meron Habtamu";
        backgroundColor = "#7c3aed";
        break;
      case "coo":
        initials = "DK";
        name = "Dawit Kebede";
        backgroundColor = "#059669";
        break;
      default:
        initials = "?";
        name = "Unknown";
    }

    const svg = `
      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${role}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${backgroundColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${backgroundColor}CC;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="95" fill="url(#grad${role})" stroke="#ffffff" stroke-width="10"/>
        <text x="100" y="115" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
              text-anchor="middle" fill="white">${initials}</text>
      </svg>
    `;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.send(svg);
  });

  // Contact form submission with email delivery
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Contact form submission received:", req.body);
      
      const validatedData = insertMessageSchema.parse(req.body);
      console.log("Validation successful:", validatedData);
      
      // Store message in database
      const message = await storage.createMessage(validatedData);
      console.log("Message stored in database with ID:", message.id);
      
      // Send email notification if email service is available
      let emailSent = false;
      if (emailService) {
        try {
          emailSent = await emailService.sendContactFormEmail({
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            subject: validatedData.subject,
            message: validatedData.message
          });
          console.log("Email service result:", emailSent);
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
        }
      }
      
      // Send Telegram notification (non-blocking)
      let telegramSent = false;
      try {
        telegramSent = await telegramService.sendContactFormNotification({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          subject: validatedData.subject,
          message: validatedData.message
        });
        console.log("Telegram service result:", telegramSent);
      } catch (telegramError) {
        console.error("Telegram notification failed:", telegramError);
      }
      
      const successResponse = { 
        success: true,
        message: "Thank you for contacting us. We'll get back to you shortly.",
        id: message.id,
        emailSent: emailSent,
        telegramSent: telegramSent
      };
      
      console.log("Sending success response:", successResponse);
      res.status(201).json(successResponse);
    } catch (error: any) {
      console.error("Contact form submission error:", error.message || error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          success: false,
          message: "Please check your form data and try again.", 
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        success: false,
        message: "Something went wrong. Please try again later." 
      });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
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
  app.post("/api/admin/request-reset", async (req, res) => {
    try {
      const { email } = forgotPasswordSchema.parse(req.body);
      const otpCode = await storage.generateOtpCode(email);
      
      if (!otpCode) {
        return res.status(404).json({ message: "Admin with this email not found" });
      }

      // Try to send email via secure SMTP service only
      let emailSent = await sendSecureOtpEmail(email, otpCode);
      // Remove fallback to SendGrid
      // Security: NEVER expose OTP in response - only send via email
      if (emailSent) {
        res.json({ 
          success: true, 
          message: "OTP sent to your email address. Check your inbox and follow the instructions."
        });
      } else {
        // For development only - log to console when email services are unavailable
        console.log(`Development mode - OTP for ${email}: ${otpCode}`);
        res.json({ 
          success: true, 
          message: "OTP sent to your email address. Check your inbox and follow the instructions."
        });
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid email", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to generate OTP" });
    }
  });

  // Admin reset password with OTP
  app.post("/api/admin/reset-password", async (req, res) => {
    try {
      const { email, otp, newPassword } = resetPasswordSchema.parse(req.body);
      const success = await storage.resetAdminPassword(email, otp, newPassword);
      
      if (!success) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      res.json({ success: true, message: "Password reset successfully" });
    } catch (error: any) {
      console.error("Reset password error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid reset data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to reset password" });
    }
  });

  // Get all messages (admin only) with enhanced pagination and search
  app.get("/api/admin/messages", authenticateAdmin, async (req, res) => {
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
  app.patch("/api/admin/messages/:id/read", authenticateAdmin, async (req, res) => {
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
  app.delete("/api/admin/messages/:id", authenticateAdmin, async (req, res) => {
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
  app.get("/api/admin/verify", authenticateAdmin, async (req: any, res) => {
    res.json({ 
      success: true, 
      admin: { id: req.admin.id, email: req.admin.email } 
    });
  });

  // Product API routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Get products error:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category.toUpperCase());
      res.json(products);
    } catch (error) {
      console.error("Get products by category error:", error);
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  app.post("/api/admin/products", authenticateAdmin, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error: any) {
      console.error("Create product error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put("/api/admin/products/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, productData);
      res.json(product);
    } catch (error: any) {
      console.error("Update product error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/admin/products/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProduct(id);
      res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Delete product error:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // News management routes
  app.get("/api/news", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await storage.getAllNews(page, limit);
      res.json(result);
    } catch (error) {
      console.error("Get news error:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get("/api/news/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const news = await storage.searchNews(query);
      res.json(news);
    } catch (error) {
      console.error("Search news error:", error);
      res.status(500).json({ message: "Failed to search news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newsItem = await storage.getNewsById(id);
      if (!newsItem) {
        return res.status(404).json({ message: "News not found" });
      }
      res.json(newsItem);
    } catch (error) {
      console.error("Get news by ID error:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.post("/api/admin/news", authenticateAdmin, async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(newsData);
      res.status(201).json(news);
    } catch (error: any) {
      console.error("Create news error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid news data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create news" });
    }
  });

  app.put("/api/admin/news/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newsData = insertNewsSchema.partial().parse(req.body);
      const news = await storage.updateNews(id, newsData);
      res.json(news);
    } catch (error: any) {
      console.error("Update news error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid news data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update news" });
    }
  });

  app.delete("/api/admin/news/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNews(id);
      res.json({ success: true, message: "News deleted successfully" });
    } catch (error) {
      console.error("Delete news error:", error);
      res.status(500).json({ message: "Failed to delete news" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}