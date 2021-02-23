import { UserDataBase } from "../data/UserDataBase";
import { HashGenerator } from "../services/HashGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/TokenGenerator";
import { User, UserInputDTO } from "./entities/User";
import { CustomError } from "./error/CustomError";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashGenerator: HashGenerator,
        private userDataBase: UserDataBase,
        private authenticator: Authenticator
    ) { }

    async createUser(input: UserInputDTO) {

        try {

            if (!input.email || !input.name || !input.nickname || !input.password) {
                throw new CustomError(405, "Please, complete email, name, nickname and password!")
            }

            if (!input.email.includes("@")) {
                throw new CustomError(406, "Invalid email!")
            }

            if (input.password.length < 6) {
                throw new CustomError(422, "Invalid password! Try with 6 characteres at least")
            }

            const id = this.idGenerator.generate()

            const hashPassword = this.hashGenerator.hash(input.password)

            const user = new User(
                id,
                input.name,
                input.email,
                input.nickname,
                hashPassword
            )

            await this.userDataBase.createUser(user)

            const accessToken = this.authenticator.generateToken({ id })

            return accessToken

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }
    }

}