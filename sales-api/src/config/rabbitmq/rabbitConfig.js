import amqp from "amqplib/callback_api.js";

import {
  PRODUCT_TOPIC,
  PRODUCT_STOCK_UPDATE_QUEUE,
  PRODUCT_STOCK_UPDATE_ROUTING_KEY,
  SALES_CONFIRMATION_QUEUE,
  SALES_CONFIRMATION_ROUTING_KEY,
} from "./queue.js";

import { RABBIT_MQ_URL } from "../constants/secrets.js";

const HALF_SECOND = 500;

export async function connectRabbitMq() {
  amqp.connect(RABBIT_MQ_URL, (error, connection) => {
    if (error) {
      throw error;
    }
    createQueue(
      connection,
      PRODUCT_STOCK_UPDATE_QUEUE,
      PRODUCT_STOCK_UPDATE_ROUTING_KEY,
      PRODUCT_TOPIC
    );
    createQueue(
      connection,
      SALES_CONFIRMATION_QUEUE,
      SALES_CONFIRMATION_ROUTING_KEY,
      PRODUCT_TOPIC
    );
    setTimeout(function () {
      connection.close();
    }, HALF_SECOND);
  });

  function createQueue(connection, queue, routingKey, topic) {
    connection.createChannel((error, chanel) => {
      if (error) {
        throw error;
      }
      chanel.assertExchange(topic, "topic", { durable: true });
      chanel.assertQueue(queue, { durable: true });
      chanel.bindQueue(queue, topic, routingKey);
    });
  }
}
