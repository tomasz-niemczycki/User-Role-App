import { Controller, Delete, Path, Route, SuccessResponse, Tags } from "tsoa";
import * as userService from "./user.deleteUser.service.js";
import { isUuid } from "../../validators/uuid.js";
import { BadRequestError, NotFoundError } from "../../shared/errors.js";

@Route("users")
@Tags("Users")
export class DeleteUserController extends Controller {
  @Delete("{uuid}")
  @SuccessResponse("204", "No Content")
  public async deleteUser(@Path() uuid: string): Promise<void> {
    if (!isUuid(uuid)) {
      throw new BadRequestError("Nieprawidłowe ID");
    }

    if (!userService.remove(uuid)) {
      throw new NotFoundError("Nie ma takiego użytkownika");
    }

    this.setStatus(204);
  }
}
