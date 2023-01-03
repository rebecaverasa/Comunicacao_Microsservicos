import axios from "axios";

import { PRODUCT_API_URL } from "../../../config/constants/secrets.js";

class productClient {
  async checkProductStock(products, token) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.info(
        `Sending request to Product API with data: ${JSON.stringify(products)}`
      );
      axios
        .post(`${PRODUCT_API_URL}/check-stock`, { headers }, products)
        .then((res) => {
          return true;
        })
        .catch((err) => {
          console.error(err.response.message);
          return false;
        });
    } catch (err) {
      return false;
    }
  }
}
export default new productClient();
