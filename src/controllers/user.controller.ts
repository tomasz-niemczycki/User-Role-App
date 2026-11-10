import { Request, Response } from "express";
import * as userService from "../services/user.service.js";
import { isUuid } from "../validators/uuid.js";

export const getUsers = (req: Request, res: Response) => {
  res.json(userService.getAll());
};

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

export const createUser = (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    res.status(400).json({ error: "Nieprawidłowe dane" });
    return;
  }

  const user = userService.create({ firstName, lastName, email });
  res.status(201).json(user);
};

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
