import express from "express";
import UserController from "../controllers/UserController.mjs";

const userRoutes = express.Router();

// middleware
import checkToken from "../helpers/verify-token.mjs";

userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.login);
userRoutes.get("/checkuser", UserController.checkUser);
userRoutes.get("/:id", UserController.getUserById);
userRoutes.patch("/edit/:id", checkToken, UserController.editUser);

export default userRoutes;
