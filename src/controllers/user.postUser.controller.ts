import { Request, Response } from "express";
import * as userService from "../services/user.postUser.service.js";
import rolesExist from "../features/areRolesExist.js";

export const createUser = (req: Request, res: Response) => {
  const { firstName, lastName, email, roleIds, password } = req.body;

  if (!firstName || !lastName || !email) {
    res.status(400).json({ error: "Nieprawidłowe dane" });
    return;
  }

  if (typeof password !== "string" || password.length < 8) {
    res.status(400).json({ error: "Hasło musi mieć co najmniej 8 znaków" });
    return;
  }

  const validRoleIds =
    Array.isArray(roleIds) &&
    roleIds.length > 0 &&
    roleIds.every((id) => Number.isInteger(id));

  if (!validRoleIds) {
    res
      .status(400)
      .json({ error: "roleIds musi być niepustą tablicą liczb całkowitych" });
    return;
  }

  if (!rolesExist(roleIds)) {
    res.status(400).json({ error: "Podano nieistniejącą rolę" });
    return;
  }

  const user = userService.create(
    { firstName, lastName, email },
    roleIds,
    password,
  );
  res.status(201).json(user);
};
