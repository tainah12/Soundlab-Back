import { genres, Music } from "../business/entities/Music";
import BaseDataBase from "./BaseDataBase";
import { UserDataBase } from "./UserDataBase";

export class MusicDataBase extends BaseDataBase {


    // private static toMusicModel(musicModel: any) {
    //     return musicModel && new Music(
    //         musicModel.id,
    //         musicModel.title,
    //         musicModel.author,
    //         musicModel.date,
    //         musicModel.file,
    //         musicModel.album,
    //         musicModel.user_id,
    //         musicModel.genre
    //     )
    // }

    public async createMusic(music: Music): Promise<void> {

        try {

            await BaseDataBase.connection
                .insert({
                    id: music.id,
                    title: music.title,
                    author: music.author,
                    date: music.date.toISOString().slice(0,10),
                    file: music.file,
                    album: music.album,
                    user_id: music.userId
                })
                .into(BaseDataBase.MUSICS_TABLE)

                for(let genres of music.genres){
                    await BaseDataBase.connection 
                    .insert({
                        id: genres,
                        music_id: music.id
                    })
                    .into(BaseDataBase.GENRE_MUSIC_TABLE)
                }


        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

    public async getMusicByUser(userId: string): Promise<void> {

        try {

            await BaseDataBase.connection
                .select("*")
                .from(BaseDataBase.MUSICS_TABLE)
                .where({user_id: userId}) 

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

}


