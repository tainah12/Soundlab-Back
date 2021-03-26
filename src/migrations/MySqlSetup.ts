import BaseDataBase from "../data/BaseDataBase";

export class MySqlSetup extends BaseDataBase {

    static createTables = async () => {

        try {
            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDataBase.USERS_TABLE} (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                nickname VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
              );
            `)

            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDataBase.MUSICS_TABLE} (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(60) NOT NULL,
                author VARCHAR(255) NOT NULL,
                date DATE DEFAULT (CURDATE()),
                file VARCHAR(255) NOT NULL,
                album VARCHAR(60) NOT NULL,
                user_id VARCHAR(255) NOT NULL,
                FOREIGN KEY(user_id) REFERENCES ${BaseDataBase.USERS_TABLE}(id) ON DELETE CASCADE
              );
            `)

            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDataBase.GENRES_TABLE} (
                genre ENUM("AXÉ", "BLUES", "BOSSA NOVA", "COUNTRY", "DISCO", "ELETRONICA", "FORRO", "FUNK", "HEAVY METAL", "HIP HOP", "INDIE", "FOLK", "JAZZ", "MPB", "NEW WAVE", "POP", "PUNK", "REGGAE", "ROCK", "SAMBA", "SOFT ROCK") PRIMARY KEY NOT NULL
            );
            `)
            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDataBase.GENRES_MUSICS_TABLE} (
                genre_id ENUM("AXÉ", "BLUES", "BOSSA NOVA", "COUNTRY", "DISCO", "ELETRONICA", "FORRO", "FUNK", "HEAVY METAL", "HIP HOP", "INDIE", "FOLK", "JAZZ", "MPB", "NEW WAVE", "POP", "PUNK", "REGGAE", "ROCK", "SAMBA", "SOFT ROCK") NOT NULL,
                music_id VARCHAR(255) NOT NULL,
                FOREIGN KEY(genre_id) REFERENCES ${BaseDataBase.GENRES_TABLE}(genre) ON DELETE CASCADE,
                FOREIGN KEY(music_id) REFERENCES ${BaseDataBase.MUSICS_TABLE}(id) ON DELETE CASCADE                
            )
            `)

            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDataBase.PLAYLISTS_TABLE} (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(60) NOT NULL,
                subtitle VARCHAR(60) NOT NULL,
                date DATE DEFAULT (CURDATE()),
                user_id VARCHAR(255) NOT NULL,
                image VARCHAR(255) NULL,   
                FOREIGN KEY(user_id) REFERENCES ${BaseDataBase.USERS_TABLE}(id) ON DELETE CASCADE                
        
            )            
            `)

            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDataBase.PLAYLISTS_MUSICS_TABLE} (
                id VARCHAR(255) PRIMARY KEY,
                playlist_id VARCHAR(255) NOT NULL,
                music_id VARCHAR(255) NOT NULL,
                FOREIGN KEY(playlist_id) REFERENCES ${BaseDataBase.PLAYLISTS_TABLE}(id) ON DELETE CASCADE,                
                FOREIGN KEY(music_id) REFERENCES ${BaseDataBase.MUSICS_TABLE}(id) ON DELETE CASCADE                
             )            
            `)

            console.log("MySql setup completed!")

        } catch (error) {
            console.log(error)

        } finally {
            BaseDataBase.connection.destroy()
        }
    }

}

MySqlSetup.createTables()