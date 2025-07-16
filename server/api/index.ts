import { Router } from "express";
import contactRouter from "./contact";
import adminRouter from "./admin";
import productsRouter from "./products";
import newsRouter from "./news";

const router = Router();

// Mount all API routes
router.use("/contact", contactRouter);
router.use("/admin", adminRouter);
router.use("/products", productsRouter);
router.use("/news", newsRouter);

export default router;