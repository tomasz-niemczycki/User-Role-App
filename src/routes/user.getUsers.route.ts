import express from "express";
import * as controller from "../controllers/user.getUsers.controller.js";

const router = express.Router();

router.get("/", controller.getUsers);

export default router;
