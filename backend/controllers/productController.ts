import { Request,Response } from "express";
import Product from "../models/Product";
import { count, log } from "node:console";
import { json } from "node:stream/consumers";

export const getProducts= async (
    req:Request,
    res:Response
): Promise<void>=>{
    try {
        const products =await Product.find();
        res.status(200).json({
            success:true,
            count:products.length,
            data:products,
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success:false,
            message:"Internal error"
        })
    }
}


export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.create(req.body);

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
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

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