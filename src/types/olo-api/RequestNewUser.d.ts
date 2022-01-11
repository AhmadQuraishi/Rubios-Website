interface RequestNewUser {


    firstname: string,          //New user's first name
    lastname: string,           //New user's last name.
    emailaddress: string,       // New user's email address.
    password: string,
    //New user's password. There are currently no requirements for capitalization, numbers, special characters, etc.

    contactnumber: string,   //New user's phone number.
    reference?: string,        //Reference for the user in the calling system (a.k.a. external reference).
    basketid?: string          //If specified, will link the specified basket to this user.

}
