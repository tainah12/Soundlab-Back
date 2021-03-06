import { musicsInputPlaylist, Playlist } from "../business/entities/Playlist"
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

    public async putMusicOnPlaylist(musics: musicsInputPlaylist): Promise<void> {

        try {
            await BaseDataBase.connection
                .insert({
                    id: musics.id,
                    playlist_id: musics.playlistId,
                    music_id: musics.musicId
                })
                .into(BaseDataBase.PLAYLISTS_MUSICS_TABLE)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getAllPlaylists(userId: string): Promise<Playlist[]> {

        try {
            const result = await BaseDataBase.connection
                .select("*")
                .from(BaseDataBase.PLAYLISTS_TABLE)
                .where({ user_id: userId })

            return result

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async searchPlaylist(id: string): Promise<Playlist[]> {

        try {
            const result = await BaseDataBase.connection
                .select("*")
                .from(BaseDataBase.PLAYLISTS_TABLE)
                .where({ id })

            return result

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async deletePlaylist(id: string): Promise<any> {

        try {
            const result = await BaseDataBase.connection
                .del()
                .from(BaseDataBase.PLAYLISTS_TABLE)
                .where({ id })

            return result

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async deleteMusicPlaylist(id: string): Promise<any> {

        try {
            const result = await BaseDataBase.connection
                .delete()
                .from(BaseDataBase.PLAYLISTS_MUSICS_TABLE)
                .where({ id })
                
            return result

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}