import { TypeOfBillingSchemeEnum } from "./olo-api.enums";
import { BillingAccount } from "./BillingAccount";
import { BillingFieldInput } from "./BillingFieldInput";

interface ResponseBillingScheme {

    id: number,
    //Olo billing scheme id. Used when submitting an order with a new gift card as payment.

    accounts: BillingAccount[],
    //type: array
    // List of accounts the user has for the billing scheme that are supported at the restaurant tied to the basket.


    cancheckbalance: boolean,
    //Indicates whether the billing scheme supports balance checks.

    fields: BillingFieldInput[],
    //type: array
    //List of billing fields that can be provided for this billing scheme.

    name: string,
    //Name of the billing scheme.   example: Kitchen Sink Gift Card

    supportsfulladdresscollection: boolean,
    //Whether or not the billing scheme requires full address collection.
    //If true, the user will need to provide their address, city, state,
    //and zip in order to process the payment.
    //This value can only be true for billing schemes with a type of "creditcard".

    supportssaveonfile: boolean,
    //Whether or not the billing scheme supports saving accounts on file for future use.

    supportstokens: boolean,
    //Whether or not the billing scheme supports payment tokens.

    type: TypeOfBillingSchemeEnum,
    //Type of billing scheme.
    //Please note that a billing scheme, while similar, is not the same thing as
    //the billing method to be used during basket submission.

}
