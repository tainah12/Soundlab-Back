import { category, genres, Music } from "../business/entities/Music";
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

            const musics: Music[] = [];

            for (let music of result) {

                const categories: category[] = []; 

                const resultGenres = await BaseDataBase.connection.raw(`
                    SELECT genre_id
                    FROM ${BaseDataBase.MUSICS_TABLE}
                    JOIN ${BaseDataBase.GENRES_MUSICS_TABLE}
                    ON ${BaseDataBase.MUSICS_TABLE}.id = ${BaseDataBase.GENRES_MUSICS_TABLE}.music_id 
                    WHERE ${BaseDataBase.MUSICS_TABLE}.id = "${music.id}"            
                `)

                for (let gen of resultGenres[0]) {
                    categories.push(gen.genre_id)

                }

                musics.push({
                    id: music.id,
                    title: music.title,
                    author: music.author,
                    date: music.date,
                    file: music.file,
                    album: music.album,
                    userId: music.userId,
                    genres: categories
                });
            }

            return musics;

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getMusicByProperty(key: string, value: string): Promise<object> {

        try {

            const result = await BaseDataBase.connection
                .select("*")
                .from(BaseDataBase.MUSICS_TABLE)
                .where(key, "like", `%${value}%`)

            for (let i = 0; i < result.length; i++) {

                const resultGenres = await BaseDataBase.connection.raw(`
                        SELECT * FROM ${BaseDataBase.MUSICS_TABLE} 
                        JOIN ${BaseDataBase.GENRES_MUSICS_TABLE}
                        ON ${BaseDataBase.MUSICS_TABLE}.id = ${BaseDataBase.GENRES_MUSICS_TABLE}.music_id
                        WHERE ${BaseDataBase.MUSICS_TABLE}.${key} = "${value}"   
                        `)

                const genreMap = resultGenres[0].map((genre: any) => {
                    return genre.genre_id
                })

                result[i].resultGenres = genreMap
            }
            
            return result

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


            console.log("musicsTitle", result[0])
            return result[0]

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


