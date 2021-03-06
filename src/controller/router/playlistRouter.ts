import express from "express";
import { PlaylistController } from "../PlaylistController";

export const playlistRouter = express.Router()

const playlistController = new PlaylistController()

playlistRouter.post("/create", playlistController.createPlaylist)
playlistRouter.put("/insert", playlistController.putMusicOnPlaylist)
playlistRouter.get("/", playlistController.getAllPlaylist)
playlistRouter.get("/:id", playlistController.searchPlaylist)
playlistRouter.delete("/delete/:id", playlistController.deleteMusicPlaylist)
playlistRouter.delete("/:id", playlistController.deletePlaylist)