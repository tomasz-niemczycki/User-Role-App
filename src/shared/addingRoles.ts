import { rolesDb } from "../db/database.js";
import { PublicUser } from "../models/user.js";

export const withRoles = (user: PublicUser) => {
  const { roleIds, ...rest } = user;
  return { ...rest, roles: rolesDb.getByIds(roleIds) };
};

export default withRoles;
