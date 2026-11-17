import { usersDb } from "../../db/database.js";
import { UserData } from "../../models/user.js";
import encodePassword from "../../shared/encodePassword.js";
import withRoles from "../../shared/addingRoles.js";
import toPublic from "../../shared/dataToPublic.js";

export const create = (data: UserData, roleIds: number[], password: string) => {
  const user = usersDb.create(
    data,
    [...new Set(roleIds)],
    encodePassword(password),
  );

  return withRoles(toPublic(user));
};
