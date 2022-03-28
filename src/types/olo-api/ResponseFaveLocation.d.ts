interface ResponseFaveLocation {


    id: number
    // Unique id for the fave location.

    vendorid: number
    // Restaurant id.

    vendorname: string
    // Name of the restaurant.

    isdefault: boolean
    // Whether or not this is the user's default fave restaurant. A user can only have one default restaurant at a time.
}
