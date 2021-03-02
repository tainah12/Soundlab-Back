import { Music } from "../business/entities/Music";
import BaseDataBase from "./BaseDataBase";

export class MusicDataBase extends BaseDataBase {


    private static toMusicModel(musicModel: any) {
        return musicModel && new Music(
            musicModel.id,
            musicModel.title,
            musicModel.author,
            musicModel.date,
            musicModel.file,
            musicModel.album,
            musicModel.user_id,
            musicModel.genre
        )
    }

    public async createMusic(music: Music): Promise<void> {

        try {

            await BaseDataBase.connection
                .insert({
                    id: music.id,
                    title: music.title,
                    author: music.author,
                    date: music.date,
                    file: music.file,
                    album: music.album,
                    user_id: music.userId
                })
                .into(BaseDataBase.MUSICS_TABLE)

            for (let genres of music.genres) {
                await BaseDataBase.connection
                    .insert({
                        genre_id: genres,
                        music_id: music.id
                    })
                    .into(BaseDataBase.GENRES_MUSICS_TABLE)
            }


        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    public async getMusicByUser(userId: string): Promise<Music[]> {

        try {

            const result = await BaseDataBase.connection
                .select("*")
                .from(BaseDataBase.MUSICS_TABLE)
                .where({ user_id: userId })

            const resultGenres = await BaseDataBase.connection.raw(`
                SELECT genre_id, music_id FROM ${BaseDataBase.MUSICS_TABLE}
                JOIN ${BaseDataBase.GENRES_MUSICS_TABLE}
                ON ${BaseDataBase.MUSICS_TABLE}.id = ${BaseDataBase.GENRES_MUSICS_TABLE}.music_id 
                WHERE ${BaseDataBase.MUSICS_TABLE}.user_id = "${userId}"            
            `)

            for (let i = 0; i < result.length; i++) {

                result[i].resultGenres = resultGenres[0].filter((genre: any) => {
                    return result[i].id === genre.music_id
                })

            }

            const musicResult = result.map((music: any) => {
                const arrayFinal = []

                for (let genre of music.resultGenres) {
                    arrayFinal.push(genre.genre_id)
                }

                return {
                    ...music,
                    resultGenres: arrayFinal
                }
            })
            return musicResult

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getMusicByProperty(key: string, value: string): Promise<object> {

        try {

            const result = await BaseDataBase.connection
                .select("*")
                .from(BaseDataBase.MUSICS_TABLE)
                .where(key, value)

            for (let i = 0; i < result.length; i++) {

                const resultGenres = await BaseDataBase.connection.raw(`
                        SELECT * FROM ${BaseDataBase.MUSICS_TABLE} 
                        JOIN ${BaseDataBase.GENRES_MUSICS_TABLE}
                        ON ${BaseDataBase.MUSICS_TABLE}.id = ${BaseDataBase.GENRES_MUSICS_TABLE}.music_id
                        WHERE ${BaseDataBase.MUSICS_TABLE}.id = "${value}"   
                        `)

                const genreMap = resultGenres[0].map((genre: any) => {
                    return genre.genre_id
                })

                result[i].resultGenres = genreMap
            }

            return result[0]


        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }


    public async getMusicByTitle(title: string): Promise<any> {

        try {

            const result = await BaseDataBase.connection.raw(`
                    SELECT * FROM ${BaseDataBase.MUSICS_TABLE}
                    WHERE title LIKE "%${title}%"
                    `)


            console.log("musicsTitle", result[0][0])
            return MusicDataBase.toMusicModel(result[0][0])

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    public async getMusicByAuthor(author: string): Promise<Music[]> {

        try {

            const result = await BaseDataBase.connection
                .select("*")
                .from(BaseDataBase.MUSICS_TABLE)
                .where({ author })

            const musicsAuthor: Music[] = []
            for (let musicAuthor of result) {
                musicsAuthor.push(MusicDataBase.toMusicModel(musicAuthor))
            }

            console.log(result[0])
            return result[0]

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

}


