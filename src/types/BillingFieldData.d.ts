import { BillingFieldName } from "enums"

export interface BillingFieldData {

    name: BillingFieldName,
    // Name of the billing field.

    value: string
    //Value of the billing field.
    //example: '4281'

}