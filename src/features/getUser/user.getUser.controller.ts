import { Request, Response } from "express";
import * as userService from "./user.getUser.service.js";
import { isUuid } from "../../validators/uuid.js";

export const getUser = (req: Request, res: Response) => {
  const uuid = req.params.uuid;

  if (!isUuid(uuid)) {
    res.status(400).json({ error: "Nieprawidłowe ID" });
    return;
  }

  const user = userService.getUser(uuid);

  if (!user) {
    res.status(404).json({ error: "Nie ma takiego użytkownika" });
    return;
  }

  res.json(user);
};
