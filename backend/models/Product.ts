import mongoose from "mongoose";
import { Schema,Document } from "mongoose"

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  thumbnail: string;
}


const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;