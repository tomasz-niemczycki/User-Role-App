import { usersDb } from "../../db/database.js";
import withRoles from "../../shared/addingRoles.js";
import toPublic from "../../shared/dataToPublic.js";

export const getUser = (uuid: string) => {
  const user = usersDb.getByUuid(uuid);
  return user && withRoles(toPublic(user));
};
