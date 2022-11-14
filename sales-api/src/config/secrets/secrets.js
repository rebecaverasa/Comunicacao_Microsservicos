const env = process.env;

export const MONGO_DB_URL = env.MONGO_DB_URL
  ? env.MONGO_DB_URL
  : "mongodb://admin:123456@localhost:27017";

export const API_SECRET = env.API_SECRET
  ? env.API_SECRET
  : "YXV0aC1hcGktc2VjcmV0LWRldi0xMjM0NTY=";
