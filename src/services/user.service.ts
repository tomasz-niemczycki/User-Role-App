import { usersDb, rolesDb } from "../db/database.js";
import { User, UserData } from "../models/user.js";

const withRoles = (user: User) => {
  const { roleIds, ...rest } = user;
  return { ...rest, roles: rolesDb.getByIds(roleIds) };
};

export const getAll = () => {
  return usersDb.getAll().map(withRoles);
};

export const getUser = (id: number) => {
  const user = usersDb.getById(id);
  return user && withRoles(user);
};

export const create = (data: UserData) => {
  const user = usersDb.create(data, rolesDb.getRandomIds());
  return withRoles(user);
};

export const update = (id: number, data: UserData) => {
  const user = usersDb.update(id, data);
  return user && withRoles(user);
};

export const remove = (id: number) => {
  return usersDb.remove(id);
};
