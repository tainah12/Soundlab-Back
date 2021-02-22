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
                genres_id VARCHAR(255) PRIMARY KEY,
                genre VARCHAR(255) NOT NULL
              );
            `)

            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS soundlab_musics (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255) NOT NULL, 
                author VARCHAR(255) NOT NULL, 
                date DATE DEFAULT (CURDATE()),
                file VARCHAR(255) NOT NULL,
                genre VARCHAR(255) NOT NULL,
                album VARCHAR(255) NOT NULL
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