import { VendorExportStatus } from "./VendorExportStatus"

interface BrandExportStatus {


    brand: string,
    //Human-readable identifier for a brand.
    //example: kitchensink

    lastupdate?: string,
    // Timestamp of the last time this brand's menu was updated, formatted as "yyyymmdd hh:mm".'
    //example: 20210127 03:43

    vendors: VendorExportStatus[]

}
