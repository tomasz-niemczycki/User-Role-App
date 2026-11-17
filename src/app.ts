import express from "express";
import getUsersRoute from "./features/getUsers/user.getUsers.route.js";
import getUserRoute from "./features/getUser/user.getUser.route.js";
import postUserRoute from "./features/postUser/user.postUser.route.js";
import putUserRoute from "./features/putUser/user.putUser.route.js";
import deleteUserRoute from "./features/deleteUser/user.deleteUser.route.js";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Aplikacja działa");
});

app.use("/users", getUsersRoute);
app.use("/user", getUserRoute);
app.use("/user", putUserRoute);
app.use("/user", deleteUserRoute);
app.use("/users", postUserRoute);
