import dayjs from "dayjs";
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


            const { title, author, file, album, genres } = inputMusic

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

            const musics = await this.musicDataBase.getMusicByUser(userData.id)

            const musicAlreadyExist = musics && musics.find((music) =>
                (music.title === title) &&
                (music.author === author) &&
                (music.album === album)
            )

            if (musicAlreadyExist) {
                throw new CustomError(422, "Music already registered")
            }

            const id: string = this.idGenerator.generate()

            const date = new Date()

            const music: Music = new Music(
                id,
                title,
                author,
                date,
                file,
                album,
                userData.id,
                genres
            )

            await this.musicDataBase.createMusic(music)

            return music

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }

    }

    public async getAllUserMusics(token: string) {

        try {

            const userData: AuthenticationData = this.getToken.getData(token)

            if (!userData) {
                throw new CustomError(401, "Unauthorized. Verify token")
            }

            const userId = userData.id

            const result = await this.musicDataBase.getMusicByUser(userId)

            return { result }

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }

    }

    public async getIdMusic(token: string, id: string) {

        try {

            const userData: AuthenticationData = this.getToken.getData(token)

            if (!userData) {
                throw new CustomError(401, "Unauthorized. Verify token")
            }

            const result = await this.musicDataBase.getMusicById(id)
            console.log(result)
            
            if (!result) {
                throw new CustomError(404, "Music not found")
            }

            return { result }

        } catch (error) {

            if (
                error.message === "invalid signature" ||
                error.message === "jwt expired" ||
                error.message === "jwt must be provided" ||
                error.message === "jwt malformed"

            ) {

                throw new CustomError(404, "Invalid token")

            } else {
                throw new CustomError(error.statusCode || 400, error.message)
            }

        }

    }

    public async getMusicByAuthorOrTitle(token: string, title: string, author: string, album: string) {
       
        try {

            const userData: AuthenticationData = this.getToken.getData(token)

            if (!userData) {
                throw new CustomError(401, "Unauthorized. Verify token")
            }

            if (!title && !author && !album) {
                throw new CustomError(406, "Please inform 'title', 'author' or 'album'")
            }

            let result 

            if (title) {
                result = await this.musicDataBase.getMusicByProperty("title", title)

            } else if (author) {
                result = await this.musicDataBase.getMusicByProperty("author", author)

            } else {
                result = await this.musicDataBase.getMusicByProperty("album", album)
            }


            if (!result.length) {
                throw new CustomError(404, "Title, author or album not found")
            }

            
            return result

        } catch (error) {

            if (error.message === "invalid signature" ||
                error.message === "jwt expired" ||
                error.message === "jwt must be provided" ||
                error.message === "jwt malformed"

            ) {

                throw new CustomError(404, "Invalid token")

            } else {
                throw new CustomError(error.statusCode || 400, error.message)
            }

        }

    }

}