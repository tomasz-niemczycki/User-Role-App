export interface PutUserRequest {
  /** @minLength 1 */
  firstName: string;
  /** @minLength 1 */
  lastName: string;
  /** @minLength 1 */
  email: string;
}
