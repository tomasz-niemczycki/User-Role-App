import express from "express";
import * as controller from "./user.getUsers.controller.js";

const router = express.Router();

router.get("/", controller.getUsers);

export default router;
