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
            musicModel.album
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
                    album: music.album
                })
                .into(BaseDataBase.MUSICS_TABLE)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }

    }

}