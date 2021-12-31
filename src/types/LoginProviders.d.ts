import { LoginProviderType } from "enums"

export interface LoginProviders {



    name: string,
    //The name of the Login Provider configured by the brand in the Olo platform. If the brand is using the Olo login provider, this is typically their brand name.
    //example: Login Provider

    provider: string,
    //The slug for a given provider
    // example: loginprovider

    type: LoginProviderType
    //The type of login provider.

}