import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from "jsonwebtoken";
import { storage } from "../../server/storage";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const admin = await storage.getAdminByEmail(decoded.email);
    
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    res.json({ 
      success: true, 
      admin: { id: admin.id, email: admin.email } 
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}