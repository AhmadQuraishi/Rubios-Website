
interface VendorExportStatus {



    vendorid: number,
    //Olo internal id for a particular vendor (a.k.a restaurant).

    extref?: string,
    //The vendor's (a.k.a. restaurant) store number; a.k.a external reference.

    lastexport?: string,
    // Timestamp of the last export of this vendor's (a.k.a. restaurant) data, formatted as "yyyymmdd hh:mm".

    lastupdate?: string
    // Timestamp of the last time this vendor's menu was updated, formatted as "yyyymmdd hh:mm".

}
