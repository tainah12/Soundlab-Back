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