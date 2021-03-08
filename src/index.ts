import express, {Express} from 'express'
import cors from 'cors'
// ------ Server ------------------
import { AddressInfo } from "net";
import { userRouter } from './controller/router/userRouter';
import { musicRouter } from './controller/router/musicRouter';
import { playlistRouter } from './controller/router/playlistRouter';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter)
app.use("/music", musicRouter)
app.use("/playlist", playlistRouter)

const server = app.listen(process.env.PORT || 5000, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});