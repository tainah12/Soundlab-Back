import { Request, Response } from "express";
import { MusicInputDTO } from "../business/entities/Music";
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicDataBase } from "../data/MusicDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/TokenGenerator";

const musicBusiness = new MusicBusiness(
    new Authenticator(),
    new IdGenerator(),
    new MusicDataBase()

)

export class MusicController {

    public createMusic = async (req: Request, res: Response): Promise<any> => {

        try {

            const token: string = req.headers.authorization as string

            const input: MusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                file: req.body.file,
                album: req.body.album,
                genres: req.body.genres
            }

            await musicBusiness.createMusic(input, token)

            res.status(200).send("created music!")

        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }

    }

    public getMusic = async (req: Request, res: Response): Promise<any> => {

        try {

            res.status(200).send({message: "Your musics"})

        } catch(error) {
            res.status(error.statusCode || 400).send({error: error.message})
        }

    }

}