interface ResponseUser {

    authtoken: string,
    // Olo user authentication token.
    //nullable: false

    firstname: string,
    // User's first name.


    lastname: string,
    //User's last name.

    cardsuffix: string,
    // Last 4 digits of the user's most recent credit card on file.

    emailaddress: string,
    // User's email address.

    userguid?: string,
    // User's unique identifier.

    // example: 73d6f9c2-60cb-474c-bb36-9686bf1dea83
}
