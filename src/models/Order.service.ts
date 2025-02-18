import orderModel from "../schema/Order.model";
import orderItemModel from "../schema/OrderItem.model";
import MemberService from "../models/Member.service";
import { Member } from "../libs/types/member";
import {
  Order,
  OrderInquery,
  OrderItemInput,
  OrderUpdateInput,
} from "../libs/types/order";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { OrderStatus } from "../libs/enums/order.enum";
import { ObjectId } from "mongoose";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;
  private readonly memberService;

  constructor() {
    this.orderModel = orderModel;
    this.orderItemModel = orderItemModel;
    this.memberService = new MemberService();
  }

  public async createOrder(
    member: Member,
    input: OrderItemInput[]
  ): Promise<Order> {
    const memberId = shapeIntoMongooseObjectId(member._id),
      amount = input.reduce((acc: number, ele: OrderItemInput) => {
        return acc + ele.itemPrice * ele.itemQuantity;
      }, 0),
      delivery = amount < 100 ? 5 : 0;

    const newOrder: Order = (await this.orderModel.create({
      orderTotal: amount + delivery,
      orderDelivery: delivery,
      memberId: memberId,
    })) as unknown as Order;

    await this.recordOrderItem(newOrder._id, input);

    return newOrder;
  }

  private async recordOrderItem(
    orderId: ObjectId,
    input: OrderItemInput[]
  ): Promise<void> {
    const promisedList = input.map(async (item: OrderItemInput) => {
      item.orderId = orderId;
      item.productId = shapeIntoMongooseObjectId(item.productId);

      await this.orderItemModel.create(item);
      return "INSERTED";
    });

    const orderItemState = await Promise.all(promisedList);
    console.log("orderItemState", orderItemState);
  }

  public async getMyOrders(
    member: Member,
    inquiry: OrderInquery
  ): Promise<Order[]> {
    const memberId = shapeIntoMongooseObjectId(member._id),
      matches = { memberId: memberId, orderStatus: inquiry.orderStatus },
      result = await this.orderModel
        .aggregate([
          { $match: matches },
          { $sort: { updatedAt: -1 } },
          { $skip: (inquiry.page - 1) * inquiry.limit },
          { $limit: inquiry.limit },
          {
            $lookup: {
              from: "orderItems",
              localField: "_id",
              foreignField: "orderId",
              as: "orderItems",
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "orderItems.productId",
              foreignField: "_id",
              as: "productData",
            },
          },
        ])
        .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateOrder(
    member: Member,
    input: OrderUpdateInput
  ): Promise<Order> {
    const memberId = shapeIntoMongooseObjectId(member._id),
      orderId = shapeIntoMongooseObjectId(input.orderId),
      orderStatus = input.orderStatus,
      result = await this.orderModel
        .findOneAndUpdate(
          { _id: orderId, memberId: memberId }, // isn't {_id: orderId} enough?
          { orderStatus: orderStatus },
          { new: true }
        )
        .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    // !safe because several orders will cause increase in the memberPoints
    // a need for check of previous status of the order
    if (orderStatus === OrderStatus.PROCESS) {
      await this.memberService.addUserPoint(member, 1);
    }
    return result as unknown as Order;
  }
}

export default OrderService;
