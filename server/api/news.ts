import { Router } from "express";
import { storage } from "../storage";

const router = Router();

// Get all news articles
router.get("/", async (req, res) => {
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

// Get single news article
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid news ID" });
    }
    
    const article = await storage.getNewsById(id);
    if (!article) {
      return res.status(404).json({ message: "News article not found" });
    }
    
    res.json(article);
  } catch (error) {
    console.error("Get news article error:", error);
    res.status(500).json({ message: "Failed to fetch news article" });
  }
});

// Search news articles
router.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const results = await storage.searchNews(query);
    res.json(results);
  } catch (error) {
    console.error("Search news error:", error);
    res.status(500).json({ message: "Failed to search news" });
  }
});

export default router;