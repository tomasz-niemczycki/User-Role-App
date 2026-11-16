import { usersDb } from "../db/database.js";
import withRoles from "../features/addingRoles.js";
import toPublic from "../features/dataToPublic.js";

export const getUser = (uuid: string) => {
  const user = usersDb.getByUuid(uuid);
  return user && withRoles(toPublic(user));
};
