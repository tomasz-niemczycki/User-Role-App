import express from "express";
import * as controller from "./user.putUser.controller.js";

const router = express.Router();

router.put("/:uuid", controller.updateUser);

export default router;
