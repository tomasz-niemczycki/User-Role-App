import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import * as userService from "./user.postUser.service.js";
import rolesExist from "../../shared/areRolesExist.js";
import { BadRequestError } from "../../shared/errors.js";
import type { PostUserRequest } from "./user.postUser.dto.js";
import type { UserResponse } from "../../shared/user.dto.js";

@Route("users")
@Tags("Users")
export class PostUserController extends Controller {
  @Post()
  @SuccessResponse("201", "Created")
  public async createUser(
    @Body() body: PostUserRequest,
  ): Promise<UserResponse> {
    const { firstName, lastName, email, roleIds, password } = body;

    // tsoa sprawdziło, że to tablica liczb; "całkowite" sprawdzamy sami
    if (!roleIds.every((id) => Number.isInteger(id))) {
      throw new BadRequestError(
        "roleIds musi być niepustą tablicą liczb całkowitych",
      );
    }

    if (!rolesExist(roleIds)) {
      throw new BadRequestError("Podano nieistniejącą rolę");
    }

    const user = userService.create(
      { firstName, lastName, email },
      roleIds,
      password,
    );
    this.setStatus(201);
    return user;
  }
}
