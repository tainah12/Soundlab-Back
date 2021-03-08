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

                .into(BaseDataBase.USERS_TABLE)

        } catch (error) {
            throw new Error(error.message);
        }

    }

    public async getUserByEmailOrNickname(input: string): Promise<User> {

        try {

            const result = await BaseDataBase.connection
                .select("*")
                .from(BaseDataBase.USERS_TABLE)
                .where({ email: input })
                .orWhere({nickname: input})

            return UserDataBase.toUserModel(result[0])

        }catch (error) {
            throw new CustomError(500, "An unexpected error ocurred with Email or nickname");
        }

    }

}