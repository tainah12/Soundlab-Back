import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";
import BaseDataBase from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {

    private static toUserModel(user: any): User {
        return user && new User(
            user.id,
            user.name,
            user.email,
            user.nickname,
            user.password
        )
    }

    public async createUser(user: User): Promise<void> {

        try {

            await BaseDataBase.connection
                .insert({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    nickname: user.nickname,
                    password: user.password
                })

                .into(BaseDataBase.USER_TABLE)

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred to create a new user. Try a new user");
        }

    }

}