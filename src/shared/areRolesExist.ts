import { rolesDb } from "../db/database.js";

export const rolesExist = (roleIds: number[]) => {
  return rolesDb.getByIds(roleIds).length === new Set(roleIds).size;
};

export default rolesExist;
