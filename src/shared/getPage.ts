import { usersDb } from "../db/database.js";
import withRoles from "./addingRoles.js";

export const getPage = (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const { items, total } = usersDb.getPage(offset, limit);

  return {
    data: items.map(withRoles),
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export default getPage;
