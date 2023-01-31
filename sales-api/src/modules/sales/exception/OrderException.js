class OrderException extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this.constructor);
  }
}

export default OrderException;
