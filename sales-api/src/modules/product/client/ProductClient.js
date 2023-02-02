import axios from "axios";

import { PRODUCT_API_URL } from "../../../config/constants/secrets.js";

class productClient {
  async checkProductStock(productsData, token, transactionid) {
    try {
      const headers = {
        Authorization: token,
        transactionid,
      };
      console.info(
        `Sending request to Product API with data: ${JSON.stringify(
          productsData
        )} and transactionID ${transactionid}`
      );
      let response = false;
      await axios
        .post(
          `${PRODUCT_API_URL}/check-stock`,
          { products: productsData.products },
          { headers }
        )
        .then((res) => {
          console.info(
            `Success response from product-API. TransactionID: ${transactionid}`
          );
          response = true;
        })
        .catch((err) => {
          console.error(
            `Error response from product-API. TransactionID: ${transactionid}`
          );
          response = false;
        });
      return response;
    } catch (err) {
      console.error(
        `Error response from product-API. TransactionID: ${transactionid}`
      );
      return false;
    }
  }
}
export default new productClient();
