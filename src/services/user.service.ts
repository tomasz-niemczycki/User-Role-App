import { usersDb, rolesDb } from "../db/database.js";
import { User, UserData, PublicUser } from "../models/user.js";

const encodePassword = (password: string) =>
  Buffer.from(password, "utf8").toString("base64");

const toPublic = ({ id, password, ...rest }: User): PublicUser => rest;

const withRoles = (user: PublicUser) => {
  const { roleIds, ...rest } = user;
  return { ...rest, roles: rolesDb.getByIds(roleIds) };
};

export const getAll = () => {
  return usersDb.getAll().map(withRoles);
};

export const getUser = (uuid: string) => {
  const user = usersDb.getByUuid(uuid);
  return user && withRoles(toPublic(user));
};

export const create = (data: UserData, roleIds: number[], password: string) => {
  const user = usersDb.create(
    data,
    [...new Set(roleIds)],
    encodePassword(password),
  );
  return withRoles(toPublic(user));
};

export const update = (uuid: string, data: UserData) => {
  const user = usersDb.update(uuid, data);
  return user && withRoles(toPublic(user));
};

export const rolesExist = (roleIds: number[]) => {
  return rolesDb.getByIds(roleIds).length === new Set(roleIds).size;
};

export const remove = (uuid: string) => {
  return usersDb.remove(uuid);
};
