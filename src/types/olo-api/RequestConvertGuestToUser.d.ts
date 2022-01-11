import { OptinEnum } from "./olo-api.enums"

interface RequestConvertGuestToUser {

    password: string,
    // New user's password. There are currently no requirements for capitalization, numbers, special characters, etc.

    optin: OptinEnum   // Whether or not the user would like to receive deals newsletters.

}
