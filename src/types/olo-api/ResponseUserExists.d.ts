interface ResponseUserExists {


    providers: string[],
    // Names of the login providers that have a user account with the provided email.
    // example: loginprovider

    userid?: string
    //Olo user guid.
    // Only returned if the API key has "Access Unauthenticated Users" permission and
    //an Olo user account else the userid will be "null".
    //nullable: true
}
