import { MusicDataBase } from "../data/MusicDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/TokenGenerator";
import { Music, MusicInputDTO } from "./entities/Music";
import { AuthenticationData } from "./entities/User";
import { CustomError } from "./error/CustomError";

export class MusicBusiness {

    constructor(

        private getToken: Authenticator,
        private idGenerator: IdGenerator,
        private musicDataBase: MusicDataBase

    ) { }

    public async createMusic(inputMusic: MusicInputDTO, token: string) {

        try {

            
            const { title, author, file, album } = inputMusic
            
            if (!inputMusic) {
                throw new CustomError(422, "Please, complete all fields")
            }
            
            if (!title || !author || !file || !album) {
                throw new CustomError(422, "Please, verify the title, author, file and album fields. They must be complete")
            }
            
            const userData: AuthenticationData = this.getToken.getData(token)

            if (!userData) {
                throw new CustomError(401, "Unauthorized. Verify token")
            }

            const id: string = this.idGenerator.generate()

            const date: Date = new Date()           

            await this.musicDataBase.createMusic(
                new Music(
                    id,
                    title,
                    author,
                    date,
                    file,
                    album,
                    userData.id
                )
            )

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }

    }

}