import { Request, Response } from "express";
import Product from "../models/Product";
import { uploadImage, deleteImage } from "../services/cloudinaryService";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Sorting
    const { sortBy = "createdAt", order = "desc", category, search } = req.query;

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;

    const allowedSortFields = [
      "title",
      "price",
      "stock",
      "rating",
      "createdAt",
    ];

    // Validate sort field
    if (
      typeof sortBy !== "string" ||
      !allowedSortFields.includes(sortBy)
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid sort field",
      });
      return;
    }

    // Validate order
    if (order !== "asc" && order !== "desc") {
      res.status(400).json({
        success: false,
        message: "Order must be asc or desc",
      });
      return;
    }

    // Validate pagination
    if (page < 1 || limit < 1) {
      res.status(400).json({
        success: false,
        message: "Page and limit must be greater than 0",
      });
      return;
    }

    const sortOrder = order === "asc" ? 1 : -1;

    // Calculate how many products to skip
    const skip = (page - 1) * limit;

    // Filter construction
    const filter: any = {};
    if (typeof category === "string" && category !== "All") {
      filter.category = category;
    }

    if (typeof search === "string" && search.trim() !== "") {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Get total products
    const totalProducts = await Product.countDocuments(filter);

    // Get paginated + sorted products
    const products = await Product.find(filter)
      .sort({
        [sortBy]: sortOrder,
      })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      page,
      limit,
      totalPages,
      sortBy,
      order,
      data: products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let thumbnail = req.body.thumbnail;
    let cloudinaryPublicId = "";

    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      thumbnail = result.secure_url;
      cloudinaryPublicId = result.public_id;
    }

    const product = await Product.create({
      ...req.body,
      thumbnail,
      cloudinaryPublicId,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    let thumbnail = req.body.thumbnail || existingProduct.thumbnail;
    let cloudinaryPublicId = existingProduct.cloudinaryPublicId;
    let newImageUploaded = false;
    let oldPublicId = existingProduct.cloudinaryPublicId;

    if (req.file) {
      const result = await uploadImage(req.file.buffer);
      thumbnail = result.secure_url;
      cloudinaryPublicId = result.public_id;
      newImageUploaded = true;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...req.body,
        thumbnail,
        cloudinaryPublicId,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (newImageUploaded && oldPublicId) {
      await deleteImage(oldPublicId);
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    
    if (product.cloudinaryPublicId) {
      await deleteImage(product.cloudinaryPublicId);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const rateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { rating } = req.body;
    const productId = req.params.id;

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      res.status(400).json({
        success: false,
        message: "Rating must be a number between 1 and 5",
      });
      return;
    }

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    let currentRating = product.rating || 0;
    let currentCount = product.ratingCount || 0;

    if (currentCount === 0 && currentRating > 0) {
      currentCount = 1; // Legacy migration: treat existing rating as 1 initial vote
    }

    const newCount = currentCount + 1;
    const newRating = ((currentRating * currentCount) + rating) / newCount;

    product.rating = Number(newRating.toFixed(1));
    product.ratingCount = newCount;

    await product.save();

    res.status(200).json({
      success: true,
      ratingAverage: product.rating,
      ratingCount: product.ratingCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

