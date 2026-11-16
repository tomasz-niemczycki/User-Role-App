import { Role } from "../models/role.js";

const ROLE_NAMES = ["admin", "editor", "author", "viewer", "guest"];

export class RoleRepository {
  private roles = ROLE_NAMES.map((name, i) => new Role(i + 1, name));

  getByIds(ids: number[]): Role[] {
    return this.roles.filter((r) => ids.includes(r.id));
  }
}

export const roleRepository = new RoleRepository();
