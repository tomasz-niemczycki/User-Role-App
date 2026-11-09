import { UserRepository } from "../repositories/users.js";
import { RoleRepository } from "../repositories/roles.js";

export const usersDb = new UserRepository();
export const rolesDb = new RoleRepository();
