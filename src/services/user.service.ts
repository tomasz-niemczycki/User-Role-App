import { usersDb, rolesDb } from "../db/database.js";
import { User, UserData } from "../models/user.js";

const withRoles = (user: User) => {
  const { roleIds, ...rest } = user;
  return { ...rest, roles: rolesDb.getByIds(roleIds) };
};

export const getAll = () => {
  return usersDb.getAll().map(withRoles);
};

export const getUser = (uuid: string) => {
  const user = usersDb.getByUuid(uuid);
  return user && withRoles(user);
};

export const create = (data: UserData) => {
  const user = usersDb.create(data, rolesDb.getRandomIds());
  return withRoles(user);
};

export const update = (uuid: string, data: UserData) => {
  const user = usersDb.update(uuid, data);
  return user && withRoles(user);
};

export const remove = (uuid: string) => {
  return usersDb.remove(uuid);
};
