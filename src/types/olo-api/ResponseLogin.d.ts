import { ResponseLoginUser } from "./ResponseLoginUser";

interface ResponseLogin {


    token?: string,
    //Olo user authentication token.
    //nullable: true

    user: ResponseLoginUser
}
