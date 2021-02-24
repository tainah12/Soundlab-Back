import dayjs from "dayjs";
import { MusicDataBase } from "../data/MusicDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/TokenGenerator";
import { Music, MusicInputDTO } from "./entities/Music";
import { CustomError } from "./error/CustomError";

export class MusicBusiness {

    constructor(
        
        private generateToken: Authenticator,
        private idGenerator: IdGenerator,
        private musicDataBase: MusicDataBase,

    ){}

    public async createMusic(inputMusic: MusicInputDTO, token: string) {

        try {

           const {title, author, file, album} = inputMusic

            if(!inputMusic) {
                throw new CustomError (422, "Please, complete all fields")
            }

            if(!title || !author || !file || !album) {
                throw new CustomError (422, "Please, verify the title, author, file and album fields. They must be complete")
            }

        const verifyToken = this.generateToken.getData(token)
        
        if(!verifyToken) {
            throw new CustomError (401, "Unauthorized. Verify token")
        }

        const id = this.idGenerator.generate()

        const date = dayjs()
        // const date = ((newDate.getFullYear() )) + "-" + ((newDate.getMonth() + 1)) + "-" + newDate.getDate();

        await this.musicDataBase.createMusic(
            new Music(
                id,
                title,
                author,
                date,
                file,
                album
            )
        )              

        } catch(error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }

    }

}