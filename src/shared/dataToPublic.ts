import { User, PublicUser } from "../models/user.js";

export const toPublic = ({ id, password, ...rest }: User): PublicUser => rest;

export default toPublic;
