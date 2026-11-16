import express from "express";
import * as controller from "../controllers/user.deleteUser.controller.js";

const router = express.Router();

router.delete("/:uuid", controller.deleteUser);

export default router;
