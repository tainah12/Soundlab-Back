import { Request, Response } from "express";
import { UserInputDTO, UserLoginInputDTO } from "../business/entities/User";
import { UserBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../data/UserDataBase";
import { HashGenerator } from "../services/HashGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/TokenGenerator";

const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashGenerator(),
    new UserDataBase(),
    new Authenticator()
)

export class UserController {

    async signup(req: Request, res: Response) {

        try {

            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const token = await userBusiness.createUser(input)

            res.status(201).send({ token })

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message });
        }

    }

    async login(req: Request, res: Response) {

        try {

            const input: UserLoginInputDTO = {
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const token = await userBusiness.login(input)

            res.status(201).send({ token })

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message });
        }

    }


}