interface ResponseLoginUser {


    authtoken: string,
    // Olo user authentication token.

    cardsuffix?: string,
    //Will always return null for this endpoint.


    emailaddress: string,
    // User's email address.

    firstname: string,
    // User's first name.

    lastname: string,
    //User's last name.
}
