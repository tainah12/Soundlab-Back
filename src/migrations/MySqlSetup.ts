import BaseDataBase from "../data/BaseDataBase";

export class MySqlSetup extends BaseDataBase {

    static createTables = async () => {
        try {
            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS soundlab_users (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                nickname VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
              );
            `)

            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS soundlab_genres (
                id VARCHAR(255) PRIMARY KEY,
                genres ENUM ("")
              );
            `)

            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS soundlab_musics (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(60) NOT NULL,
                author VARCHAR(255) NOT NULL,
                date DATE DEFAULT (CURDATE()),
                file VARCHAR(255) NOT NULL,
                album VARCHAR(60) NOT NULL,
                FOREIGN KEY(author) REFERENCES lamusic_users(id)
              );
            `)
            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS lamusic_genre_music (
                id VARCHAR(255) PRIMARY KEY,
                genre VARCHAR(255) NOT NULL,
                music VARCHAR(255) NOT NULL UNIQUE,
                FOREIGN KEY(genre) REFERENCES lamusic_genres(id),
                FOREIGN KEY(music) REFERENCES lamusic_music(id)
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