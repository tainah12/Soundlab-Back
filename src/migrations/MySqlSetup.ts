import BaseDataBase from "../data/BaseDataBase";

export class MySqlSetup extends BaseDataBase {

    static createTables = async () => {

        try {
            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDataBase.USER_TABLE} (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                nickname VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
              );
            `)

            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDataBase.GENRES_TABLE} (
                id VARCHAR(255) PRIMARY KEY,
                genres ENUM ("AXÉ", "BLUES", "BOSSA NOVA", "COUNTRY", "DISCO", "ELETRONICA", "FORRO", "FUNK", "HEAVY METAL", "HIP HOP", "INDIE", "FOLK", "JAZZ", "MPB", "NEW WAVE", "POP", "PUNK", "REGGAE", "ROCK", "SAMBA", "SOFT ROCK")
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
                FOREIGN KEY(user_id) REFERENCES ${BaseDataBase.USER_TABLE}(id)
              );
            `)
            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDataBase.GENRE_MUSIC_TABLE} (
                id VARCHAR(255) PRIMARY KEY,
                genre_id VARCHAR(255) NOT NULL,
                music_id VARCHAR(255) NOT NULL,
                FOREIGN KEY(genre_id) REFERENCES ${BaseDataBase.GENRES_TABLE}(id),
                FOREIGN KEY(music_id) REFERENCES ${BaseDataBase.MUSICS_TABLE}(id)
            );
            `)

            console.log("MySql setup completed!")


        } catch (error) {
            console.log(error)

        } finally {
            BaseDataBase.connection.destroy()
        }
    }

}