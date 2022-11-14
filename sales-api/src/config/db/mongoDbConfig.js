import mongoose from "mongoose";

import { MONGO_DB_URL } from "../secrets/secrets.js";

export function connect() {
  mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
  });
  mongoose.connection.on("connected", function () {
    console.info("The application has connected with MongoDB successfully!");
  });
  mongoose.connection.on("error", function () {
    console.error("The application didnt connected with MongoDB.");
  });
}
