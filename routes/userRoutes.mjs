import express from "express";
import UserController from "../controllers/UserController.mjs";

const userRoutes = express.Router();

userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.login);
userRoutes.get("/checkuser", UserController.checkUser);

export default userRoutes;
