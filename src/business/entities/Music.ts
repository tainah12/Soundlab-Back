export interface MusicInputDTO {
    title: string;
    author: string;
    file: string;
    album: string
}

// export interface MusicOutputDTO {
//     id: string,
//     title: string,
//     author: string,
//     createdAt: Date,
//     file: string,
//     album: string,
//     userId: string
// };


export class Music {
    constructor(

        public readonly id: string,
        public readonly title: string,
        public readonly author: string,
        public readonly date: Date,
        public readonly file: string,
        // public readonly genre: string[],
        public readonly album: string,
        public readonly userId: string

    ) { }

}