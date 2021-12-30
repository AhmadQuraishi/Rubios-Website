import { Optin } from "enums"

export interface RequestConvertGuestToUser {

    password: string,
    // New user's password. There are currently no requirements for capitalization, numbers, special characters, etc.

    optin: Optin   // Whether or not the user would like to receive deals newsletters.

}
