import { ResponseLoginUser } from "./ResponseLoginUser";

export interface ResponseLogin {


    token?: string,
    //Olo user authentication token.
    //nullable: true

    user: ResponseLoginUser
}