import { Router } from "express";

import UserController from "../controller/UserController.js";
import checkToken from "../../../config/auth/checkToken.js";

const router = new Router();

router.post("/api/user/auth/", UserController.getAcessToken);

router.use(checkToken);

router.get("/api/user/email/:email", UserController.findByEmail);

// /api/user/email/nomedapessoa@gmail/com

export default router;