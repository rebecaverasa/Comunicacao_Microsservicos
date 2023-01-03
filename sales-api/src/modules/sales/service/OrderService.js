import OrderRepository from "../repository/OrderRepository";
import { sendMessageToProductStockUpdateQueue } from "../../product/rabbitmq/productStockUpdateSender.js";
import { PENDING, ACCEPTED, REJECTED } from "../status/OrderStatus.js";
import OrderException from "../exception/OrderException.js";
import { BAD_REQUEST } from "../../../config/constants/httpStatus.js";
import ProductClient from "../../product/client/ProductClient.js";

class OrderService {
  async createOrder(req) {
    try {
      let orderData = req.body;
      this.validateOrderData(orderData);
      const { authUser } = req;
      const { authorization } = req.headers;
      let order = this.createInitialOrderData(order, authUser);
      await this.validateProductStock(order, authorization);
      let createdOrder = await OrderRepository.save(order);
      this.sendMessage(createdOrder);
      return {
        status: httpStatus.SUCCESS,
        createOrder,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  createInitialOrderData(orderData, authUser) {
    return {
      status: PENDING,
      user: authUser,
      createdAt: new Date(),
      updateAt: new Date(),
      products: orderData,
    };
  }

  async updateOrder(orderMessage) {
    try {
      const order = JSON.parse(orderMessage);
      if (order.salesId && order.status) {
        let existingOrder = await OrderRepository.findById(order.salesId);
        if (existingOrder && order.status !== existingOrder.status) {
          existingOrder.status = order.status;
          existingOrder.updatedAt = new Date();
          await OrderRepository.save(existingOrder);
        }
      } else {
        console.warn("The order message was not complete.");
      }
    } catch (err) {
      console.error("Could not parse order message from queue.");
      console.error(err.message);
    }
  }

  validateOrderData(data) {
    if (!data || !data.products) {
      throw new OrderException(BAD_REQUEST, "The products must be informed.");
    }
  }

  async validateProductStock(order, token) {
    let stockIsOut = await ProductClient.checkProductStock(
      order.products,
      token
    );
    if (stockIsOut) {
      throw new OrderException(
        BAD_REQUEST,
        "The stock is out for the products."
      );
    }
  }

  sendMessage(createdOrder) {
    const message = {
      salesId: createdOrder.id,
      products: createdOrder.products,
    };
    sendMessageToProductStockUpdateQueue(message);
  }
}

export default new OrderService();
