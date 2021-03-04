import express from "express";
import { PlaylistController } from "../PlaylistController";

export const playlistRouter = express.Router()

const paylistController = new PlaylistController()

playlistRouter.post("/create", paylistController.createPlaylist)

