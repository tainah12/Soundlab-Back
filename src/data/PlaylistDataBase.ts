import { Music } from "../business/entities/Music"
import { Playlist } from "../business/entities/Playlist"
import BaseDataBase from "./BaseDataBase"
import { GenreDatabase } from "./GenreDataBase"

const getGenre = new GenreDatabase()

export class PlaylistDataBase extends BaseDataBase {

    public async createPlaylist(playlist: Playlist): Promise<void> {

        try {

            await BaseDataBase.connection
                .insert({
                    id: playlist.id,
                    title: playlist.title,
                    subtitle: playlist.subtitle,
                    date: playlist.date,
                    user_id: playlist.userId,
                    image: playlist.image
                })
                .into(BaseDataBase.PLAYLISTS_TABLE)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getMusicById(id: string): Promise<Music[]> {

        try {
            const result = await BaseDataBase.connection
                .select("*")
                .from(BaseDataBase.MUSICS_TABLE)
                .where({ id })

            const resultFinal = getGenre.getGenre(result)

            return resultFinal

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}

