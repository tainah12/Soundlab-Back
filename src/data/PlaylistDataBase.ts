import { Playlist } from "../business/entities/Playlist"
import BaseDataBase from "./BaseDataBase"

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
}
