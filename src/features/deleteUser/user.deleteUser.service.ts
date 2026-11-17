import { usersDb } from "../../db/database.js";

export const remove = (uuid: string) => {
  return usersDb.remove(uuid);
};
