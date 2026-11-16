import express from "express";
import * as controller from "../controllers/user.putUser.controller.js";

const router = express.Router();

router.put("/:uuid", controller.updateUser);

export default router;
