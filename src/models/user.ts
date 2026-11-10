export class User {
  constructor(
    public id: number,
    public uuid: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public roleIds: number[],
  ) {}
}

export type UserData = Omit<User, "id" |"uuid" | "roleIds">;
export type PublicUser = Omit<User, "id">;
