import express from "express";
import * as controller from "./user.getUser.controller.js";

const router = express.Router();

router.get("/:uuid", controller.getUser);

export default router;
