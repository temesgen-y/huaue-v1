import { users, messages, admins, products, news, type User, type InsertUser, type Message, type InsertMessage, type Admin, type InsertAdmin, type Product, type InsertProduct, type News, type InsertNews } from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, sql, and, or } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(page?: number, limit?: number, search?: string, status?: string): Promise<{ messages: Message[], total: number }>;
  markMessageAsRead(id: number): Promise<void>;
  deleteMessage(id: number): Promise<void>;
  // Admin authentication methods
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  validateAdminPassword(email: string, password: string): Promise<Admin | null>;
  generateOtpCode(email: string): Promise<string | null>;
  resetAdminPassword(email: string, otp: string, newPassword: string): Promise<boolean>;
  // Product management methods
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  // News management methods
  getAllNews(page?: number, limit?: number): Promise<{ news: News[], total: number }>;
  getNewsById(id: number): Promise<News | undefined>;
  createNews(newsItem: InsertNews): Promise<News>;
  updateNews(id: number, newsItem: Partial<InsertNews>): Promise<News>;
  deleteNews(id: number): Promise<void>;
  searchNews(query: string): Promise<News[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values(message)
      .returning();
    return newMessage;
  }

  async getMessages(page: number = 1, limit: number = 10, search: string = "", status: string = "all"): Promise<{ messages: Message[], total: number }> {
    const offset = (page - 1) * limit;
    
    // Build query conditions
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
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    
    const messageList = await db
      .select()
      .from(messages)
      .where(whereClause)
      .orderBy(desc(messages.submittedAt))
      .limit(limit)
      .offset(offset);
    
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(whereClause);
    
    const total = totalResult[0].count;
    return { messages: messageList, total };
  }

  async markMessageAsRead(id: number): Promise<void> {
    await db.update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id));
  }

  async deleteMessage(id: number): Promise<void> {
    console.log(`Storage: Attempting to delete message with ID: ${id}`);
    
    const result = await db.delete(messages).where(eq(messages.id, id));
    console.log(`Storage: Delete operation completed for message ID: ${id}`);
    console.log(`Storage: Delete result:`, result);
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.email, email));
    return admin || undefined;
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(admin.passwordHash, 10);
    const [newAdmin] = await db
      .insert(admins)
      .values({
        ...admin,
        passwordHash: hashedPassword,
      })
      .returning();
    return newAdmin;
  }

  async validateAdminPassword(email: string, password: string): Promise<Admin | null> {
    const admin = await this.getAdminByEmail(email);
    if (!admin) return null;
    
    const isValid = await bcrypt.compare(password, admin.passwordHash);
    return isValid ? admin : null;
  }

  async generateOtpCode(email: string): Promise<string | null> {
    const admin = await this.getAdminByEmail(email);
    if (!admin) return null;

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiry = new Date(Date.now() + 900000); // 15 minutes from now

    await db.update(admins)
      .set({ 
        otpCode,
        otpExpiry: expiry,
      })
      .where(eq(admins.id, admin.id));

    return otpCode;
  }

  async resetAdminPassword(email: string, otp: string, newPassword: string): Promise<boolean> {
    const admin = await this.getAdminByEmail(email);
    if (!admin || !admin.otpCode || !admin.otpExpiry || admin.otpExpiry < new Date()) {
      return false;
    }

    if (admin.otpCode !== otp) {
      return false;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(admins)
      .set({
        passwordHash: hashedPassword,
        otpCode: null,
        otpExpiry: null,
      })
      .where(eq(admins.id, admin.id));

    return true;
  }

  // Product management methods
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.isActive, true)).orderBy(desc(products.createdAt));
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products)
      .where(eq(products.category, category))
      .orderBy(desc(products.createdAt));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values({
      ...product,
      updatedAt: new Date(),
    }).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product> {
    const [updatedProduct] = await db.update(products)
      .set({
        ...product,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.update(products)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(products.id, id));
  }

  // News management methods
  async getAllNews(page: number = 1, limit: number = 10): Promise<{ news: News[], total: number }> {
    const offset = (page - 1) * limit;
    
    const [newsItems, totalCount] = await Promise.all([
      db.select().from(news).orderBy(desc(news.createdAt)).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(news)
    ]);
    
    return {
      news: newsItems,
      total: totalCount[0]?.count || 0
    };
  }

  async getNewsById(id: number): Promise<News | undefined> {
    const [newsItem] = await db.select().from(news).where(eq(news.id, id));
    return newsItem || undefined;
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const [createdNews] = await db
      .insert(news)
      .values(newsItem)
      .returning();
    return createdNews;
  }

  async updateNews(id: number, newsItem: Partial<InsertNews>): Promise<News> {
    const [updatedNews] = await db
      .update(news)
      .set({
        ...newsItem,
        updatedAt: new Date()
      })
      .where(eq(news.id, id))
      .returning();
    return updatedNews;
  }

  async deleteNews(id: number): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }

  async searchNews(query: string): Promise<News[]> {
    return await db
      .select()
      .from(news)
      .where(ilike(news.title, `%${query}%`))
      .orderBy(desc(news.createdAt));
  }
}

export const storage = new DatabaseStorage();