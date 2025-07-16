import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from "jsonwebtoken";
import { storage } from "../../server/storage";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

// Authentication middleware
const authenticateAdmin = async (req: VercelRequest): Promise<any> => {
  const token = req.headers.authorization?.toString().replace("Bearer ", "");
  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwt.verify(token, JWT_SECRET) as any;
  const admin = await storage.getAdminByEmail(decoded.email);
  
  if (!admin) {
    throw new Error("Admin not found");
  }

  return admin;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Authenticate admin
    const admin = await authenticateAdmin(req);

    if (req.method === 'GET') {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string || "";
      const status = req.query.status as string || "all";
      
      console.log(`Admin messages request - Page: ${page}, Limit: ${limit}, Search: "${search}", Status: ${status}`);
      
      const result = await storage.getMessages(page, limit, search, status);
      
      console.log(`Messages retrieved: ${result.messages.length} messages, Total: ${result.total}`);
      
      res.json(result);
    } else if (req.method === 'DELETE') {
      const messageId = parseInt(req.query.id as string);
      
      if (isNaN(messageId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid message ID" 
        });
      }
      
      await storage.deleteMessage(messageId);
      
      res.json({ 
        success: true, 
        message: "Message deleted successfully" 
      });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error("Admin messages error:", error);
    
    if (error.message === "No token provided" || error.message === "Admin not found") {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    res.status(500).json({ message: "Internal server error" });
  }
}