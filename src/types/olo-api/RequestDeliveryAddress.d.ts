export interface RequestDeliveryAddress {

    id?: number,
    //Olo delivery address id.
    //Only provide this field if the user wishes to use a previously saved address,
    // all other request fields can be omitted.

    building?: string,
    //Apartment, suite, or building name.

    streetaddress?: string,   //Street address.

    city?: string,

    zipcode?: string,   //Zip code.

    phonenumber?: string,
    //Phone number for user associated with the basket.
    //Please provide as an 11 digit number with no special characters.
    //If the basket is associated with a registered user,
    //their account contact number will be updated.
    //For guest users without a registered account,
    //please provide the phone number
    // in the[basket submission](#operation / SubmitOrderwithSinglePayment) `contactnumber` field instead.
    specialinstructions?: string,
    //Special instructions for this delivery address.

    isdefault: boolean
    //Whether or not this delivery address is the user's default address.
    //A user can only have one default address at a time.
    //If the user does not have any other addresses associated with their account,
    //the newly added address will become their default address.

}
