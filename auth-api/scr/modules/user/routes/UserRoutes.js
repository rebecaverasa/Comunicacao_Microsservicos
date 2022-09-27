import { Router } from "express";

import UserController from "../controller/UserController.js";

const router = new Router();

router.get("/api/user/email/:email", UserController.findByEmail);
// /api/user/email/nomedapessoa@gmail/com

export default router;