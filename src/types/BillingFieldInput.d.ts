import { BillingFieldName, BillingFieldType } from "enums"

export interface BillingFieldInput {


    name: BillingFieldName,
    //Name of the billing field.

    type: BillingFieldType,
    //Type of the billing field.

    label: string,
    //Label for the billing field.
    // example: Giftcard Number

    minlength: number,
    //Minimum length of the billing field input.

    maxlength: number,
    //Maximum length of the billing field input.

    isMandatory: boolean
    //Whether or not the billing field must be supplied when using the corresponding billing scheme. 
    //For PIN fields, please use the[BIN Validation endpoint](#operation / VerifyGiftCardPINRequirement) 
    //to determine whether or not the billing scheme requires a PIN.

}