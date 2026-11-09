import { User, UserData } from "../models/user.js";

export class UserRepository {
  private users: User[] = [];
  private nextId = 1;

  getAll(): User[] {
    return [...this.users];
  }

  getById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  create(data: UserData, roleIds: number[]): User {
    const user = new User(
      this.nextId++,
      data.firstName,
      data.lastName,
      data.email,
      roleIds,
    );
    this.users.push(user);
    return user;
  }

  update(id: number, data: UserData): User | undefined {
    const user = this.getById(id);
    if (!user) return undefined;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    return user;
  }

  remove(id: number): boolean {
    const before = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    return this.users.length < before;
  }
}

export const userRepository = new UserRepository();
