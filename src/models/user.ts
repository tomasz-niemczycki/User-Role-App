export class User {
  constructor(
    public id: number,
    public uuid: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public roleIds: number[],
    public password: string,
  ) {}
}

export type UserData = Omit<User, "id" | "uuid" | "roleIds" | "password">;
export type PublicUser = Omit<User, "id" | "password">;
