import { Role } from "../models/role.js";

const ROLE_NAMES = ["admin", "editor", "author", "viewer", "guest"];

export class RoleRepository {
  private roles = ROLE_NAMES.map((name, i) => new Role(i + 1, name));

  getAll(): Role[] {
    return [...this.roles];
  }

  getByIds(ids: number[]): Role[] {
    return this.roles.filter((r) => ids.includes(r.id));
  }

  getRandomIds(): number[] {
    const count = 1 + Math.floor(Math.random() * this.roles.length);

    return this.roles
      .map((r) => r.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }
}

export const roleRepository = new RoleRepository();
