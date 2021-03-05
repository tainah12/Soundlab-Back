export class Playlist {
    constructor(

        readonly id: string,
        readonly title: string,
        readonly subtitle: string,
        readonly date: Date,
        readonly userId: string,
        readonly image?: string

    ) { }

}

export interface PlaylistInputDTO {
    title: string;
    subtitle: string;
    image?: string
}

export interface musicsPlaylist {   
    musicId: string;
    playlistId: string;
}

export interface musicsInputPlaylist {
    id: string,
    musicId: string;
    playlistId: string;
}