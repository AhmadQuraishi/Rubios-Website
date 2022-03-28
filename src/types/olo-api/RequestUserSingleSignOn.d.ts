interface RequestUserSingleSignOn {

    provider: string,
    //Slug of the single sign on(SSO) provider.This can be obtained by reaching out to your Customer Success representative.
    //Please note that the provider must also be enabled for the brand associated with your API credentials.
    // example: loginprovider

    providertoken: string,
    //Login provider's token assigned to the user. Sometimes referred to as the provider's "access token" for the user.
    // example: oianvo223983bueufbi23u4ur9238hk - udfb9284298bfasdu - ibf9282bf9

    provideruserid: string,
    // User id in the login provider's system.
    //Only required if the login provider requires server - to - server authentication, otherwise use`providertoken`.
    //example: oi231 - asdoin234 - 3rf

    contactnumber?: string,    //If specified, this contact number will be applied to the user.

    firstname?: string,
    // First name of the user. If specified in the request body, Olo will update the user account.
    //Required for sign - ins using Apple ID.

    lastname?: string,
    //Last name of the user. If specified in the request body, Olo will update the user account.
    //Required for sign - ins using Apple ID.

    emailaddress?: string,
    //Email address for the user. If specified in the request body, Olo wil update the user account.
    //Required for sign - ins using Apple ID.

    basketid?: string          //If specified, will link the basket to this new user.
}
