import { PlaylistDataBase } from "../data/PlaylistDataBase"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/TokenGenerator"
import { PlaylistInputDTO, Playlist, musicsPlaylist } from "./entities/Playlist"
import { AuthenticationData } from "./entities/User"
import { CustomError } from "./error/CustomError"

export class PlaylistBusiness {

    constructor(

        private getToken: Authenticator,
        private idGenerator: IdGenerator,
        private playlistDataBase: PlaylistDataBase

    ) { }

    public async createPlaylist(inputPlaylist: PlaylistInputDTO, token: string) {

        try {

            const { title, subtitle, image } = inputPlaylist

            if (!inputPlaylist) {
                throw new CustomError(422, "Please, complete all fields")
            }

            if (!title || !subtitle) {
                throw new CustomError(422, "Please, verify the title and subtitle fields. They must be complete")
            }

            const userData: AuthenticationData = this.getToken.getData(token)

            if (!userData) {
                throw new CustomError(401, "Unauthorized. Verify token")
            }

            const id: string = this.idGenerator.generate()

            const date = new Date()

            const playlist: Playlist = new Playlist(
                id,
                title,
                subtitle,
                date,
                userData.id,
                image
            )

            await this.playlistDataBase.createPlaylist(playlist)

            return playlist

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }

    }

    public async putMusicOnPlaylist(input: musicsPlaylist, token: string) {

        try {

            const { musicId, playlistId } = input

            if (!musicId || !playlistId) {
                throw new CustomError(405, "Not found. Verify your music Id or playlist Id. All fields must be completed correctly!")
            }

            const userData: AuthenticationData = this.getToken.getData(token)

            if (!userData) {
                throw new CustomError(401, "Unauthorized. Verify token")
            }
            
            const musicsPlaylist: musicsPlaylist = {
                musicId,
                playlistId
            }

            await this.playlistDataBase.putMusicOnPlaylist(musicsPlaylist)

            return musicsPlaylist

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }
    }

    public async getAllPlaylists(token: string) {

        try {

            const userData: AuthenticationData = this.getToken.getData(token)

            if (!userData) {
                throw new CustomError(401, "Unauthorized. Verify token")
            }            

            const userId = userData.id

            const result = await this.playlistDataBase.getAllPlaylists(userId)

            const resultFinal =  result.map((details) => {
                return {
                    id: details.id,
                    title: details.title,
                    subtitle: details.subtitle,
                    image: details.image
                }
            })

            return resultFinal 

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }
    }

    public async searchPlaylist(token: string, playlistId: string) {

        try {

            const userData: AuthenticationData = this.getToken.getData(token)

            if (!userData) {
                throw new CustomError(401, "Unauthorized. Verify token")
            }            

            const result = await this.playlistDataBase.searchPlaylist(playlistId)

            return result 

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }
    }
} 