import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from "../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id, query } = req.query;
    
    if (id && typeof id === 'string') {
      const articleId = parseInt(id);
      if (isNaN(articleId)) {
        return res.status(400).json({ message: "Invalid news ID" });
      }
      
      const article = await storage.getNewsById(articleId);
      if (!article) {
        return res.status(404).json({ message: "News article not found" });
      }
      
      res.json(article);
    } else if (query && typeof query === 'string') {
      const results = await storage.searchNews(query);
      res.json(results);
    } else {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await storage.getAllNews(page, limit);
      res.json(result);
    }
  } catch (error) {
    console.error("News API error:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
}