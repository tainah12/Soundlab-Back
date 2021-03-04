
export interface MusicInputDTO {
    title: string;
    author: string;
    file: string;
    album: string;
    genres: category[]
}

export interface MusicOutputDTO {
    id: string,
    title: string,
    author: string,
    date: string,
    file: string,
    album: string,    
    genres: genres[]
};


export class Music {
    constructor(

        public readonly id: string,
        public readonly title: string,
        public readonly author: string,
        public readonly date: Date,
        public readonly file: string,
        public readonly album: string,
        public readonly userId: string,
        public readonly genres: category[]

    ) { }

}

export type category = {
    id: string,
    genre: string
}

export enum genres {
    AXE = "AXÉ", 
    BLUES = "BLUES", 
    BOSSA_NOVA = "BOSSA NOVA", 
    COUNTRY = "COUNTRY", 
    DISCO = "DISCO", 
    ELETRONICA = "ELETRONICA", 
    FORRO = "FORRO", 
    FUNK = "FUNK", 
    HEAVY_METAL = "HEAVY METAL", 
    HIP_HOP = "HIP HOP", 
    INDIE = "INDIE", 
    FOLK = "FOLK", 
    JAZZ = "JAZZ", 
    MPB = "MPB", 
    NEW_WAVE = "NEW WAVE", 
    POP = "POP", 
    PUNK = "PUNK", 
    REGGAE = "REGGAE", 
    ROCK = "ROCK", 
    SAMBA = "SAMBA", 
    SOFT_ROCK = "SOFT ROCK"
}
