import express from "express";

export const musicRouter = express.Router()

const musicController = new musicController()

musicRouter.post("/", musicController.createMusic)

