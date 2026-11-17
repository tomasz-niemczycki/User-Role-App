import { Controller, Get, Query, Route, Tags } from "tsoa";
import getPage from "../../shared/getPage.js";
import type { UsersPageResponse } from "../../shared/user.dto.js";

@Route("users")
@Tags("Users")
export class GetUsersController extends Controller {
  /**
   * @isInt page
   * @minimum page 1
   * @isInt limit
   * @minimum limit 1
   * @maximum limit 100
   */
  @Get()
  public async getUsers(
    @Query() page: number = 1,
    @Query() limit: number = 10,
  ): Promise<UsersPageResponse> {
    return getPage(page, limit);
  }
}
