import { Request, Response } from "express";
import Product from "../models/Product";
import cloudinary from "../config/cloudinary";
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Sorting
    const { sortBy = "createdAt", order = "desc",category, } = req.query;

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

// Category filter
const filter =
  typeof category === "string" && category !== "All"
    ? { category }
    : {};

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

    if (req.file) {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file!.buffer);
      });

      thumbnail = result.secure_url;
    }

    const product = await Product.create({
      ...req.body,
      thumbnail,
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
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
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
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
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