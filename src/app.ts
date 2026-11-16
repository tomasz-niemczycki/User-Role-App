import express from "express";
import getUsersRoute from "./routes/user.getUser.route.js";
import getUserRoute from "./routes/user.getUser.route.js";
import postUserRoute from "./routes/user.postUser.route.js";
import putUserRoute from "./routes/user.putUser.route.js";
import deleteUserRoute from "./routes/user.deleteUser.route.js";

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
