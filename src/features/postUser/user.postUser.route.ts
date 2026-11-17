import express from "express";
import * as controller from "./user.postUser.controller.js";

const router = express.Router();

router.post("/", controller.createUser);

export default router;
