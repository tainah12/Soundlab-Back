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

            const music = await musicBusiness.createMusic(input, token)

            res.status(200).send({message: "created music!", music})

        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }

    }

    public getAllMusicsUser = async (req: Request, res: Response): Promise<any> => {

        try {

            const token: string = req.headers.authorization as string

            const result = await musicBusiness.getAllUserMusics(token)


            res.status(200).send({message: result})

        } catch(error) {
            res.status(error.statusCode || 400).send({error: error.message})
        }

    }

    public getMusicId = async (req: Request, res: Response): Promise<any> => {

        try {

            const token: string = req.headers.authorization as string

            const idMusic: string = req.params.id as string



            const result = await musicBusiness.getIdMusic(token, idMusic)


            res.status(200).send({message: result})

        } catch(error) {
            res.status(error.statusCode || 400).send({error: error.message})
        }

    }

    public getMusicTitle = async (req: Request, res: Response): Promise<any> => {

        try {

            const title: string = req.query.title as string
            // const authorMusic: string = req.query.author as string
            
            const token: string = req.headers.authorization as string


            const result = await musicBusiness.getTitleMusic(token, title)

            res.status(200).send({message: result})

        } catch(error) {
            res.status(error.statusCode || 400).send({error: error.message})
        }

    }

}