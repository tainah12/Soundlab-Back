import { category, genres, Music } from "../business/entities/Music";
import BaseDataBase from "./BaseDataBase";
import { GenreDatabase } from "./GenreDataBase";

const getGenre = new GenreDatabase()

export class MusicDataBase extends BaseDataBase {

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

    public async getMusicById(id: string): Promise<Music[]> {

        try {
            const result = await BaseDataBase.connection
            .select("*")
            .from(BaseDataBase.MUSICS_TABLE)
            .where({id})

            const resultFinal = getGenre.getGenre(result)

            return resultFinal
                      
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getMusicByProperty(key: string, value: string): Promise<Music[]> {

        try {
            const result = await BaseDataBase.connection
            .select("*")
            .from(BaseDataBase.MUSICS_TABLE)
            .where(key, "like" ,`%${value}%`)

            const resultFinal = getGenre.getGenre(result)

            return resultFinal
                      
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async deletMusic(id: string) {

        try {
            const result = await BaseDataBase.connection
            .delete()
            .from(BaseDataBase.MUSICS_TABLE)
            .where({id})

            return result
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }
}




