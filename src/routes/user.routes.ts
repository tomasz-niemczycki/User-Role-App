import express from "express";
import * as controller from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", controller.getUsers);
router.get("/:uuid", controller.getUser);
router.post("/", controller.createUser);
router.put("/:uuid", controller.updateUser);
router.delete("/:uuid", controller.deleteUser);

export default router;
