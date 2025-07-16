import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from "../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { category } = req.query;
    
    if (category && typeof category === 'string') {
      const products = await storage.getProductsByCategory(category.toUpperCase());
      res.json(products);
    } else {
      const products = await storage.getAllProducts();
      res.json(products);
    }
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}