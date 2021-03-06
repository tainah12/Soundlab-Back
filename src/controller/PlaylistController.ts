import { musicsPlaylist, PlaylistInputDTO } from "../business/entities/Playlist"
import { PlaylistBusiness } from "../business/PlaylistBusiness"
import { PlaylistDataBase } from "../data/PlaylistDataBase"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/TokenGenerator"
import { Request, Response } from "express";


const playlistBusiness = new PlaylistBusiness(
    new Authenticator(),
    new IdGenerator(),
    new PlaylistDataBase()

)

export class PlaylistController {

    public createPlaylist = async (req: Request, res: Response): Promise<any> => {

        try {

            const token: string = req.headers.authorization as string

            const input: PlaylistInputDTO = {
                title: req.body.title,
                subtitle: req.body.subtitle,
                image: req.body.image
            }

            const playlist = await playlistBusiness.createPlaylist(input, token)

            res.status(200).send({ message: "created playlist!", playlist })

        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }

    }

    public putMusicOnPlaylist = async (req: Request, res: Response): Promise<any> => {

        try {

            const token: string = req.headers.authorization as string

            const input: musicsPlaylist = {
                musicId: req.body.musicId,
                playlistId: req.body.playlistId
            }

            await playlistBusiness.putMusicOnPlaylist(input, token)

            res.status(200).send({ message: "Music included in the playlist", input })

        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }

    }

    public getAllPlaylist = async (req: Request, res: Response): Promise<any> => {

        try {

            const token: string = req.headers.authorization as string

            const playlist = await playlistBusiness.getAllPlaylists(token)

            res.status(200).send({ message: "All playlists", playlist })

        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }

    }

    public searchPlaylist = async (req: Request, res: Response): Promise<any> => {

        try {

            const token: string = req.headers.authorization as string

            const playlistId: string = req.params.id

            const playlist = await playlistBusiness.searchPlaylist(token, playlistId)

        
            res.status(200).send({ message: "All playlists", playlist })

        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }

    }

    public deletePlaylist = async (req: Request, res: Response): Promise<any> => {

        try {

            const token: string = req.headers.authorization as string

            const playlistId: string = req.params.id

            const playlist = await playlistBusiness.deletePlaylist(token, playlistId)
    
            res.status(200).send({ message: "Deleted playlist", playlistId })

        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }

    }
    public deleteMusicPlaylist = async (req: Request, res: Response): Promise<any> => {

        try {

            const token: string = req.headers.authorization as string

            const musicId: string = req.params.id

            await playlistBusiness.deleteMusicPlaylist(token, musicId)
    
            res.status(200).send({ message: "Music deleted on playlist", musicId })

        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }

    }
}