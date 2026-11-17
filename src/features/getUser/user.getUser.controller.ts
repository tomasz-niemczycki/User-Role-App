import { Controller, Get, Path, Route, Tags } from "tsoa";
import * as userService from "./user.getUser.service.js";
import { isUuid } from "../../validators/uuid.js";
import { BadRequestError, NotFoundError } from "../../shared/errors.js";
import type { UserResponse } from "../../shared/user.dto.js";

@Route("users")
@Tags("Users")
export class GetUserController extends Controller {
  @Get("{uuid}")
  public async getUser(@Path() uuid: string): Promise<UserResponse> {
    if (!isUuid(uuid)) {
      throw new BadRequestError("Nieprawidłowe ID");
    }

    const user = userService.getUser(uuid);

    if (!user) {
      throw new NotFoundError("Nie ma takiego użytkownika");
    }

    return user;
  }
}
