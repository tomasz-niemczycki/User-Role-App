export interface RoleResponse {
  id: number;
  name: string;
}

export interface UserResponse {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: RoleResponse[];
}

export interface UsersPageResponse {
  data: UserResponse[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
