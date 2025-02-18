import mongoose, { Schema } from "mongoose";
import {
  ProductSize,
  ProductVolume,
  ProductStatus,
  ProductCollection,
} from "../libs/enums/product.enum";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PAUSE,
    },

    productCollection: {
      type: String,
      enum: ProductCollection,
      require: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productLeftCount: {
      type: Number,
      required: true,
    },

    productSize: {
      type: String,
      enum: ProductSize,
      default: ProductSize.NORMAL,
    },

    productVolume: {
      type: Number,
      enum: ProductVolume,
      default: ProductVolume.ONE,
    },

    productDesc: {
      type: String,
    },

    productImages: {
      type: [String],
      default: [],
    },

    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// compound unique
productSchema.index(
  { productName: 1, productSize: 1, productVolume: 1 },
  { unique: true }
);

export default mongoose.model("Product", productSchema);
