import express from "express";

export const userRouter = express.Router()

const userController = new UserController()

userRouter.post("/signup", userController.login)
userRouter.post("/login", userController.login)