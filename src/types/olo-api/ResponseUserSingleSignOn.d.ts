interface ResponseUserSingleSignOn {


    provider: string,
    // Slug of the login provider.

    providertoken: string,
    //Login provider's token assigned to the user.
    //Sometimes referred to as the provider's "access token" for the user.

    provideruserid: string,
    //User id in the login provider's system.
    //Only presented if the login provider requires server - to - server authentication,
    //otherwise "providertoken" will be used.

    contactnumber?: string
    //Contact number to associate with the user in an 11 digit format
    //with no spaces or other non - numeric characters.

    basketid?: string
    // If it was provided in the request, this Olo basket is linked to the user.

    authtoken?: string
    //Olo user authentication token that will be returned if successful.
}
