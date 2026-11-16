import { usersDb } from "../db/database.js";
import { UserData } from "../models/user.js";
import encodePassword from "../features/encodePassword.js";
import withRoles from "../features/addingRoles.js";
import toPublic from "../features/dataToPublic.js";

export const create = (data: UserData, roleIds: number[], password: string) => {
  const user = usersDb.create(
    data,
    [...new Set(roleIds)],
    encodePassword(password),
  );
  console.log(user.password);

  return withRoles(toPublic(user));
};
