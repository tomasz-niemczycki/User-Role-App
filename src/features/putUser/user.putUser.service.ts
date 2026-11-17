import { usersDb } from "../../db/database.js";
import { UserData } from "../../models/user.js";
import withRoles from "../../shared/addingRoles.js";
import toPublic from "../../shared/dataToPublic.js";

export const update = (uuid: string, data: UserData) => {
  const user = usersDb.update(uuid, data);
  return user && withRoles(toPublic(user));
};
