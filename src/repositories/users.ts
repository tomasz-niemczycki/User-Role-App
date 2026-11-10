import { User, UserData, PublicUser } from "../models/user.js";
import {randomUUID} from "node:crypto";

export class UserRepository {
  private users: User[] = [];
  private nextId = 1;

  getAll(): PublicUser[] {
    return this.users.map(({id, ...rest}) => rest);
  }

  getById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  getByUuid(uuid: string): User | undefined {
    return this.users.find((u) => u.uuid === uuid);
  }

  create(data: UserData, roleIds: number[]): User {
    const user = new User(
      this.nextId++,
      randomUUID(),
      data.firstName,
      data.lastName,
      data.email,
      roleIds,
    );
    this.users.push(user);
    return user;
  }

  update(uuid: string, data: UserData): User | undefined {
    const user = this.getByUuid(uuid);
    if (!user) return undefined;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    return user;
  }

  remove(uuid: string): boolean {
    const before = this.users.length;
    this.users = this.users.filter((u) => u.uuid !== uuid);
    return this.users.length < before;
  }
}

export const userRepository = new UserRepository();
