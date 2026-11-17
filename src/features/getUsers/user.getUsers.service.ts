import { usersDb } from "../../db/database.js";
import withRoles from "../../shared/addingRoles.js";

export const getAll = () => {
  return usersDb.getAll().map(withRoles);
};
