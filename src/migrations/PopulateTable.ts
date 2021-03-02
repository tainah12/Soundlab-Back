import BaseDatabase from "../data/BaseDataBase";
import { MySqlSetup } from "./MySqlSetup";

export class PopulateTable extends MySqlSetup {

    static populateGenres = async () => {
        try {

            await BaseDatabase.connection.raw(`
              INSERT INTO ${BaseDatabase.GENRES_TABLE}(genre)
               VALUES 
                ("AXÉ"),
                ("BLUES"),
                ("BOSSA NOVA"),
                ("COUNTRY"),
                ("DISCO"),
                ("ELETRONICA"),
                ("FORRO"),
                ("FUNK"),
                ("HEAVY METAL"),
                ("HIP HOP"),
                ("INDIE"),
                ("FOLK"),
                ("JAZZ"),
                ("MPB"),
                ("NEW WAVE"),
                ("POP"),
                ("PUNK"),
                ("REGGAE"),
                ("ROCK"),
                ("SAMBA"),
                ("SOFT ROCK");
            `)

            console.log("Populate table completed!")

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)

        } finally {
            BaseDatabase.connection.destroy()
        }
    }
}

PopulateTable.populateGenres() 