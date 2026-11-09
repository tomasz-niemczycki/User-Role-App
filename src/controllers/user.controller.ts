import { Request, Response } from "express";
import * as userService from "../services/user.service.js";

export const getUsers = (req: Request, res: Response) => {
  res.json(userService.getAll());
};

export const getUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Nieprawidłowe ID" });
    return;
  }

  const user = userService.getUser(id);

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
  const id = Number(req.params.id);
  const { firstName, lastName, email } = req.body;

  if (Number.isNaN(id) || !firstName || !lastName || !email) {
    res.status(400).json({ error: "Nieprawidłowe dane" });
    return;
  }

  const user = userService.update(id, { firstName, lastName, email });

  if (!user) {
    res.status(404).json({ error: "Nie ma takiego użytkownika" });
  }

  res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Nieprawidłowe ID" });
    return;
  }

  if (!userService.remove(id)) {
    res.status(404).json({ error: "Nie ma takiego użytkownika" });
    return;
  }

  res.status(204).send();
};
