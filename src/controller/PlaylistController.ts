import { PlaylistInputDTO } from "../business/entities/Playlist"
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
}
