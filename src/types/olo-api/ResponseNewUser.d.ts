interface ResponseNewUser {




    firstname: string           //User's first name.
    lastname: string            //User's last name.
    emailaddress: string        //User's email address.
    authtoken: string,          //Olo user authentication token.
    contactnumber: string,      //User's phone number.


    reference?: string
    // Reference for the user in the calling system (a.k.a. external reference). nullable: true
    basketid: string
    // If it was provided in the request, this Olo basket is linked to the user.
    //example: 73d6f9c2-60cb-474c-bb36-9686bf1dea83

}
