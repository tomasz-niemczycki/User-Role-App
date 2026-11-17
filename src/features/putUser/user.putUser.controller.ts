import { Body, Controller, Path, Put, Route, Tags } from "tsoa";
import * as userService from "./user.putUser.service.js";
import { isUuid } from "../../validators/uuid.js";
import { BadRequestError, NotFoundError } from "../../shared/errors.js";
import type { PutUserRequest } from "./user.putUser.dto.js";
import type { UserResponse } from "../../shared/user.dto.js";

@Route("users")
@Tags("Users")
export class PutUserController extends Controller {
  @Put("{uuid}")
  public async updateUser(
    @Path() uuid: string,
    @Body() body: PutUserRequest,
  ): Promise<UserResponse> {
    if (!isUuid(uuid)) {
      throw new BadRequestError("Nieprawidłowe dane");
    }

    const user = userService.update(uuid, {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    });

    if (!user) {
      throw new NotFoundError("Nie ma takiego użytkownika");
    }

    return user;
  }
}
