import ProductModel from "../schema/Product.model";
import ViewService from "./View.service";
import {
  ProductInput,
  Product,
  ProductUpdateInput,
  ProductInquiry,
} from "../libs/types/product";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { T } from "../libs/types/common";
import { ProductStatus } from "../libs/enums/product.enum";
import { ObjectId } from "mongoose";
import { ViewInput, View } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";

class ProductService {
  private readonly productModel;
  private readonly viewService;

  constructor() {
    this.productModel = ProductModel;
    this.viewService = new ViewService();
  }
  // SPA
  public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
    const match: T = { productStatus: ProductStatus.PROCESS };

    if (inquiry.productCollection)
      match.productCollection = inquiry.productCollection;
    if (inquiry.search)
      match.productName = { $regex: new RegExp(inquiry.search, "i") };

    const sort: T =
      inquiry.order === "productPrice"
        ? { [inquiry.order]: 1 }
        : { [inquiry.order]: -1 };

    const result = await this.productModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1 },
      ])
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result as unknown as Product[];
  }

  public async getProduct(
    memberId: ObjectId | null,
    id: String
  ): Promise<Product> {
    const productId = shapeIntoMongooseObjectId(id);

    let result = await this.productModel
      .findOne({ _id: productId, productStatus: ProductStatus.PROCESS })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    if (memberId) {
      // check View Log existence
      const input: ViewInput = {
        memberId: memberId,
        viewGroup: ViewGroup.PRODUCT,
        viewRefId: productId,
      };
      const existView = await this.viewService.checkViewExistence(input);

      // Insert View
      if (!existView) {
        await this.viewService.insertMemberView(input);

        // Increase Counts
        result = await this.productModel
          .findByIdAndUpdate(
            productId,
            { $inc: { productViews: +1 } },
            { new: true }
          )
          .exec();
      }
    }

    return result as unknown as Product;
  }

  // SSR
  public async getAllProducts(): Promise<Product> {
    const result = await this.productModel.find().exec();
    // console.log(result);

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result as unknown as Product;
  }

  public async createNewProduct(input: ProductInput): Promise<Product[]> {
    try {
      console.log("entered createNewProduct");
      const result = await this.productModel.create(input);
      console.log("leaving createNewProduct");

      return result as unknown as Product[];
    } catch (err) {
      console.log("ERROR, model:createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    id: string,
    input: ProductUpdateInput
  ): Promise<Product> {
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findByIdAndUpdate({ _id: id }, input, { new: true })
      .exec();

    if (!result) {
      throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    }

    return result as unknown as Product;
  }
}

export default ProductService;
