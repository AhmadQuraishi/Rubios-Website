interface ManualFireOrder {


    id?: string,
    //Order reference ("orderref") in the calling system.

    timeplaced: string,
    // Time the manual fire order was placed, formatted as "yyyymmdd hh:mm"

    vendorname: string
    //Name of the restaurant the manual fire order was placed at.
    // example: Kitchen Sink Seaport

}
