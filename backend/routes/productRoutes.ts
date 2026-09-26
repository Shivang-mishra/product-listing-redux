import express from "express";
import upload from "../middleware/upload";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  rateProduct
} from "../controllers/productController";

import { authenticateToken, requireAdmin } from "../middleware/auth";

const router = express.Router();

router.get("/categories", getCategories);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", authenticateToken, requireAdmin, upload.single("image"), createProduct);

router.put("/:id", authenticateToken, requireAdmin, upload.single("image"), updateProduct);

router.delete("/:id", authenticateToken, requireAdmin, deleteProduct);

router.post("/:id/rating", rateProduct);

export default router;