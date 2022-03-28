
interface ResponseDeliveryAddress {

    id?: number,
    //Olo delivery address id.


    building?: string,
    //Apartment, suite, or building name.

    streetaddress: string,   //Street address.

    city?: string,

    zipcode?: string,   //Zip code.

    phonenumber: string,
    //Always displays an empty string.
    //Please reference the phone number associated with the user's account instead.
    //This will be displayed in the basket `contactnumber` field and in the response
    // from the[Retrieve User Contact Number](#operation / RetrieveUserContactNumber) endpoint.

    specialinstructions?: string,
    //Special instructions for this delivery address.

    isdefault: boolean
    //WWhether or not this delivery address is the user's default address.
    // A user can only have one default address at a time.
}
