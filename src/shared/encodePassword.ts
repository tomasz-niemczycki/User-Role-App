export const encodePassword = (password: string) =>
  Buffer.from(password, "utf8").toString("base64");

export default encodePassword;
