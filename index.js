var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  adminLoginSchema: () => adminLoginSchema,
  admins: () => admins,
  forgotPasswordSchema: () => forgotPasswordSchema,
  insertAdminSchema: () => insertAdminSchema,
  insertMessageSchema: () => insertMessageSchema,
  insertNewsSchema: () => insertNewsSchema,
  insertProductSchema: () => insertProductSchema,
  insertUserSchema: () => insertUserSchema,
  messages: () => messages,
  news: () => news,
  products: () => products,
  resetPasswordSchema: () => resetPasswordSchema,
  users: () => users
});
import { pgTable, text, serial, boolean, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 150 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  otpCode: varchar("otp_code", { length: 10 }),
  otpExpiry: timestamp("otp_expiry"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  isRead: boolean("is_read").default(false).notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  isRead: true,
  submittedAt: true
});
var insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  otpCode: true,
  otpExpiry: true,
  createdAt: true
});
var adminLoginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required")
});
var forgotPasswordSchema = z.object({
  email: z.string().email("Valid email is required")
});
var resetPasswordSchema = z.object({
  email: z.string().email("Valid email is required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters")
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  // 'HUAYUE' or 'EIDER'
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  specifications: text("specifications"),
  certifications: varchar("certifications", { length: 255 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary"),
  content: text("content").notNull(),
  thumbnail: varchar("thumbnail", { length: 500 }),
  publishDate: timestamp("publish_date").defaultNow(),
  author: varchar("author", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc, ilike, sql, and, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async createMessage(message) {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
  async getMessages(page = 1, limit = 10, search = "", status = "all") {
    const offset = (page - 1) * limit;
    const conditions = [];
    if (search) {
      conditions.push(
        or(
          ilike(messages.name, `%${search}%`),
          ilike(messages.email, `%${search}%`),
          ilike(messages.phone, `%${search}%`),
          ilike(messages.subject, `%${search}%`),
          ilike(messages.message, `%${search}%`)
        )
      );
    }
    if (status === "read") {
      conditions.push(eq(messages.isRead, true));
    } else if (status === "unread") {
      conditions.push(eq(messages.isRead, false));
    }
    const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
    const messageList = await db.select().from(messages).where(whereClause).orderBy(desc(messages.submittedAt)).limit(limit).offset(offset);
    const totalResult = await db.select({ count: sql`count(*)` }).from(messages).where(whereClause);
    const total = totalResult[0].count;
    return { messages: messageList, total };
  }
  async markMessageAsRead(id) {
    await db.update(messages).set({ isRead: true }).where(eq(messages.id, id));
  }
  async deleteMessage(id) {
    console.log(`Storage: Attempting to delete message with ID: ${id}`);
    const result = await db.delete(messages).where(eq(messages.id, id));
    console.log(`Storage: Delete operation completed for message ID: ${id}`);
    console.log(`Storage: Delete result:`, result);
  }
  async getAdminByEmail(email) {
    const [admin] = await db.select().from(admins).where(eq(admins.email, email));
    return admin || void 0;
  }
  async createAdmin(admin) {
    const hashedPassword = await bcrypt.hash(admin.passwordHash, 10);
    const [newAdmin] = await db.insert(admins).values({
      ...admin,
      passwordHash: hashedPassword
    }).returning();
    return newAdmin;
  }
  async validateAdminPassword(email, password) {
    const admin = await this.getAdminByEmail(email);
    if (!admin) return null;
    const isValid = await bcrypt.compare(password, admin.passwordHash);
    return isValid ? admin : null;
  }
  async generateOtpCode(email) {
    const admin = await this.getAdminByEmail(email);
    if (!admin) return null;
    const otpCode = Math.floor(1e5 + Math.random() * 9e5).toString();
    const expiry = new Date(Date.now() + 9e5);
    await db.update(admins).set({
      otpCode,
      otpExpiry: expiry
    }).where(eq(admins.id, admin.id));
    return otpCode;
  }
  async resetAdminPassword(email, otp, newPassword) {
    const admin = await this.getAdminByEmail(email);
    if (!admin || !admin.otpCode || !admin.otpExpiry || admin.otpExpiry < /* @__PURE__ */ new Date()) {
      return false;
    }
    if (admin.otpCode !== otp) {
      return false;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(admins).set({
      passwordHash: hashedPassword,
      otpCode: null,
      otpExpiry: null
    }).where(eq(admins.id, admin.id));
    return true;
  }
  // Product management methods
  async getAllProducts() {
    return await db.select().from(products).where(eq(products.isActive, true)).orderBy(desc(products.createdAt));
  }
  async getProductsByCategory(category) {
    return await db.select().from(products).where(eq(products.category, category)).orderBy(desc(products.createdAt));
  }
  async createProduct(product) {
    const [newProduct] = await db.insert(products).values({
      ...product,
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    return newProduct;
  }
  async updateProduct(id, product) {
    const [updatedProduct] = await db.update(products).set({
      ...product,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(products.id, id)).returning();
    return updatedProduct;
  }
  async deleteProduct(id) {
    await db.update(products).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() }).where(eq(products.id, id));
  }
  // News management methods
  async getAllNews(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [newsItems, totalCount] = await Promise.all([
      db.select().from(news).orderBy(desc(news.createdAt)).limit(limit).offset(offset),
      db.select({ count: sql`count(*)` }).from(news)
    ]);
    return {
      news: newsItems,
      total: totalCount[0]?.count || 0
    };
  }
  async getNewsById(id) {
    const [newsItem] = await db.select().from(news).where(eq(news.id, id));
    return newsItem || void 0;
  }
  async createNews(newsItem) {
    const [createdNews] = await db.insert(news).values(newsItem).returning();
    return createdNews;
  }
  async updateNews(id, newsItem) {
    const [updatedNews] = await db.update(news).set({
      ...newsItem,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(news.id, id)).returning();
    return updatedNews;
  }
  async deleteNews(id) {
    await db.delete(news).where(eq(news.id, id));
  }
  async searchNews(query) {
    return await db.select().from(news).where(ilike(news.title, `%${query}%`)).orderBy(desc(news.createdAt));
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import jwt from "jsonwebtoken";

// server/emailService.ts
import nodemailer from "nodemailer";
var EmailService = class {
  transporter;
  adminEmail;
  constructor(config) {
    this.adminEmail = config.adminEmail;
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      // true for 465, false for other ports
      auth: {
        user: config.user,
        pass: config.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  async sendContactFormEmail(contactData) {
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
                    ${contactData.message.replace(/\n/g, "<br>")}
                  </div>
                </div>
                
                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
                  <p style="margin: 0; color: #666; font-size: 14px;">
                    This message was sent from the HUAYUE PLASTICS contact form on ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
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

Sent on: ${(/* @__PURE__ */ new Date()).toLocaleString()}
        `
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Email sending failed:", error);
      return false;
    }
  }
  async verifyConnection() {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error("Email service connection failed:", error);
      return false;
    }
  }
};
var createEmailService = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!host || !user || !password || !adminEmail) {
    console.warn("Email service disabled: Missing SMTP configuration");
    return null;
  }
  const config = {
    host,
    port,
    user,
    password,
    adminEmail
  };
  return new EmailService(config);
};
async function sendSecureOtpEmail(email, otpCode) {
  const host = process.env.SMTP_HOST || "mail.huayueplasticsindustry.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  if (!user || !password) {
    console.log("Secure OTP email disabled: Missing SMTP credentials");
    return false;
  }
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      // SSL for port 465, STARTTLS for 587
      auth: {
        user,
        pass: password
      },
      tls: {
        rejectUnauthorized: false
        // Allow self-signed certificates for cPanel
      }
    });
    const mailOptions = {
      from: `"HUAYUE PLASTICS INDUSTRY" <${user}>`,
      to: email,
      subject: "HUAYUE Admin Password Reset OTP",
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
            <p style="margin: 0;">\xA9 2025 HUAYUE PLASTICS INDUSTRY PLC. All rights reserved.</p>
          </div>
        </div>
      `,
      text: `
HUAYUE PLASTICS INDUSTRY - Admin Password Reset

Your One-Time Password (OTP) is: ${otpCode}
It will expire in 15 minutes.
Do not share this code with anyone.

Security Notice: HUAYUE PLASTICS INDUSTRY staff will never ask for your password or OTP code.

\xA9 2025 HUAYUE PLASTICS INDUSTRY PLC. All rights reserved.
      `
    };
    await transporter.sendMail(mailOptions);
    console.log(`Secure OTP email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Failed to send secure OTP email:", error);
    return false;
  }
}

// server/telegramService.ts
var TelegramService = class {
  config = null;
  constructor() {
    this.initialize();
  }
  initialize() {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      this.config = {
        botToken,
        chatId
      };
      console.log("Telegram service initialized successfully");
    } else {
      console.log("Telegram configuration not found - service disabled");
    }
  }
  async sendContactFormNotification(contactData) {
    if (!this.config) {
      console.log("Telegram service not configured");
      return false;
    }
    try {
      const message = `
\u{1F4E9} *New Contact Message*
\u{1F464} *Name:* ${contactData.name}
\u{1F4E7} *Email:* ${contactData.email}
\u{1F4DE} *Phone:* ${contactData.phone}
\u{1F4DD} *Subject:* ${contactData.subject}
\u{1F4AC} *Message:* ${contactData.message}

---
_From HUAYUE PLASTICS INDUSTRY Website_
      `.trim();
      const response = await fetch(`https://api.telegram.org/bot${this.config.botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: this.config.chatId,
          text: message,
          parse_mode: "Markdown"
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Telegram API error:", errorData);
        return false;
      }
      console.log("Telegram notification sent successfully");
      return true;
    } catch (error) {
      console.error("Telegram service error:", error);
      return false;
    }
  }
  isConfigured() {
    return this.config !== null;
  }
};
var telegramService = new TelegramService();

// server/routes.ts
var JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
var emailService = createEmailService();
var authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
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
async function registerRoutes(app2) {
  try {
    const existingAdmin = await storage.getAdminByEmail("admin@huayueplasticsindustry.com");
    if (!existingAdmin) {
      await storage.createAdmin({
        name: "System Administrator",
        email: "admin@huayueplasticsindustry.com",
        passwordHash: "Admin4321!"
        // This will be hashed by the storage layer
      });
      console.log("Default admin created: admin@huayueplasticsindustry.com / Admin4321!");
    }
  } catch (error) {
    console.log("Admin initialization skipped:", error);
  }
  app2.get("/api/generate-profile/:role", (req, res) => {
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
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.send(svg);
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      console.log("Contact form submission received:", req.body);
      const validatedData = insertMessageSchema.parse(req.body);
      console.log("Validation successful:", validatedData);
      const message = await storage.createMessage(validatedData);
      console.log("Message stored in database with ID:", message.id);
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
        emailSent,
        telegramSent
      };
      console.log("Sending success response:", successResponse);
      res.status(201).json(successResponse);
    } catch (error) {
      console.error("Contact form submission error:", error.message || error);
      if (error.name === "ZodError") {
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
  app2.post("/api/admin/login", async (req, res) => {
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
    } catch (error) {
      console.error("Admin login error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid login data", errors: error.errors });
      }
      res.status(500).json({ message: "Login failed" });
    }
  });
  app2.post("/api/admin/request-reset", async (req, res) => {
    try {
      const { email } = forgotPasswordSchema.parse(req.body);
      const otpCode = await storage.generateOtpCode(email);
      if (!otpCode) {
        return res.status(404).json({ message: "Admin with this email not found" });
      }
      let emailSent = await sendSecureOtpEmail(email, otpCode);
      if (emailSent) {
        res.json({
          success: true,
          message: "OTP sent to your email address. Check your inbox and follow the instructions."
        });
      } else {
        console.log(`Development mode - OTP for ${email}: ${otpCode}`);
        res.json({
          success: true,
          message: "OTP sent to your email address. Check your inbox and follow the instructions."
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid email", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to generate OTP" });
    }
  });
  app2.post("/api/admin/reset-password", async (req, res) => {
    try {
      const { email, otp, newPassword } = resetPasswordSchema.parse(req.body);
      const success = await storage.resetAdminPassword(email, otp, newPassword);
      if (!success) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
      res.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
      console.error("Reset password error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid reset data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to reset password" });
    }
  });
  app2.get("/api/admin/messages", authenticateAdmin, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";
      const status = req.query.status || "all";
      console.log(`Admin messages request - Page: ${page}, Limit: ${limit}, Search: "${search}", Status: ${status}`);
      const result = await storage.getMessages(page, limit, search, status);
      console.log(`Messages retrieved: ${result.messages.length} messages, Total: ${result.total}`);
      console.log("Sample messages:", result.messages.slice(0, 3).map((m) => ({
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
  app2.patch("/api/admin/messages/:id/read", authenticateAdmin, async (req, res) => {
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
  app2.delete("/api/admin/messages/:id", authenticateAdmin, async (req, res) => {
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
  app2.get("/api/admin/verify", authenticateAdmin, async (req, res) => {
    res.json({
      success: true,
      admin: { id: req.admin.id, email: req.admin.email }
    });
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const products2 = await storage.getAllProducts();
      res.json(products2);
    } catch (error) {
      console.error("Get products error:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products2 = await storage.getProductsByCategory(category.toUpperCase());
      res.json(products2);
    } catch (error) {
      console.error("Get products by category error:", error);
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });
  app2.post("/api/admin/products", authenticateAdmin, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      console.error("Create product error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });
  app2.put("/api/admin/products/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, productData);
      res.json(product);
    } catch (error) {
      console.error("Update product error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product" });
    }
  });
  app2.delete("/api/admin/products/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProduct(id);
      res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Delete product error:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });
  app2.get("/api/news", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await storage.getAllNews(page, limit);
      res.json(result);
    } catch (error) {
      console.error("Get news error:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });
  app2.get("/api/news/search", async (req, res) => {
    try {
      const query = req.query.q;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const news2 = await storage.searchNews(query);
      res.json(news2);
    } catch (error) {
      console.error("Search news error:", error);
      res.status(500).json({ message: "Failed to search news" });
    }
  });
  app2.get("/api/news/:id", async (req, res) => {
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
  app2.post("/api/admin/news", authenticateAdmin, async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const news2 = await storage.createNews(newsData);
      res.status(201).json(news2);
    } catch (error) {
      console.error("Create news error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid news data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create news" });
    }
  });
  app2.put("/api/admin/news/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newsData = insertNewsSchema.partial().parse(req.body);
      const news2 = await storage.updateNews(id, newsData);
      res.json(news2);
    } catch (error) {
      console.error("Update news error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid news data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update news" });
    }
  });
  app2.delete("/api/admin/news/:id", authenticateAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNews(id);
      res.json({ success: true, message: "News deleted successfully" });
    } catch (error) {
      console.error("Delete news error:", error);
      res.status(500).json({ message: "Failed to delete news" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 3e3;
  server.listen({
    port,
    host: "127.0.0.1"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
