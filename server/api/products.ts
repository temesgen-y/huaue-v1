import { Router } from "express";
import { storage } from "../storage";

const router = Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await storage.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Get products by category
router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await storage.getProductsByCategory(category.toUpperCase());
    res.json(products);
  } catch (error) {
    console.error("Get products by category error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

export default router;