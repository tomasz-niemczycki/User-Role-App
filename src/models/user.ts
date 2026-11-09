export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public roleIds: number[],
  ) {}
}

export type UserData = Omit<User, "id" | "roleIds">;
