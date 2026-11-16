import { Request, Response } from "express";
import * as userService from "../services/user.putUser.service.js";
import { isUuid } from "../validators/uuid.js";

export const updateUser = (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const { firstName, lastName, email } = req.body;

  if (!isUuid(uuid) || !firstName || !lastName || !email) {
    res.status(400).json({ error: "Nieprawidłowe dane" });
    return;
  }

  const user = userService.update(uuid, { firstName, lastName, email });

  if (!user) {
    res.status(404).json({ error: "Nie ma takiego użytkownika" });
  }

  res.json(user);
};
