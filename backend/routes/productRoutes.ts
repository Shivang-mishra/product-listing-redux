import express from "express";
import multer from "multer";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", upload.single("image"), createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;