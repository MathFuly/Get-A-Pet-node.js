import express from "express";
import UserController from "../controllers/UserController.mjs";

const userRoutes = express.Router();

userRoutes.post("/register", UserController.register);

export default userRoutes;
