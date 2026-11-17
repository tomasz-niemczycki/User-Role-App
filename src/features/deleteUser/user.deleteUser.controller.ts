import { Request, Response } from "express";
import * as userService from "./user.deleteUser.service.js";
import { isUuid } from "../../validators/uuid.js";

export const deleteUser = (req: Request, res: Response) => {
  const uuid = req.params.uuid;

  if (!isUuid(uuid)) {
    res.status(400).json({ error: "Nieprawidłowe ID" });
    return;
  }

  if (!userService.remove(uuid)) {
    res.status(404).json({ error: "Nie ma takiego użytkownika" });
    return;
  }

  res.status(204).send();
};
