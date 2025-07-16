import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from "jsonwebtoken";
import { adminLoginSchema } from "../../shared/schema";
import { storage } from "../../server/storage";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
}