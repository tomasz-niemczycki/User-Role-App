import { Request, Response } from "express";
import getPage from "../features/getPage.js";

export const getUsers = (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  const valid =
    Number.isInteger(page) &&
    page >= 1 &&
    Number.isInteger(limit) &&
    limit >= 1 &&
    limit <= 100;

  if (!valid) {
    res.status(400).json({ error: "Nieprawidłowe parametry stronicowania" });
    return;
  }

  res.json(getPage(page, limit));
};
