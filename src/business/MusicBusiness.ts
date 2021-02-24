import { MusicDataBase } from "../data/MusicDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/TokenGenerator";
import { MusicInputDTO } from "./entities/Music";
import { CustomError } from "./error/CustomError";

export class MusicBusiness {

    constructor(
        
        private tokenGenerator: Authenticator,
        private musicDataBase: MusicDataBase,
        private idGenerator: IdGenerator

    ){}

    public async createMusic(inputMusic: MusicInputDTO) {

        try {

           const {title, author, file, album} = inputMusic

            if(!inputMusic) {
                throw new CustomError (422, "Please, complete all fields")
            }

            if(!title || !author || !file || !album) {
                throw new CustomError (422, "Please, verify the title, author, file and album fields. They must be complete")
            }

              

        } catch(error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }

    }

}