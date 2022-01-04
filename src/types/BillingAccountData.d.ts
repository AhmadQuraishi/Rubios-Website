import { BillingMethod, CardType, Country, SaveOnFile } from "enums"
import { BillingFieldData } from "./BillingFieldData";

export interface BillingAccountData {



    billingmethod: BillingMethod,
    //Name of the billing method. 
    //"creditcardonfile" is the most recent credit card on file, "creditcardtoken" is a payment token that
    // can be used to charge a credit card, "billingaccount" is a previously saved account, 
    //"cash" is pay -in -store, and "storedvalue" is a gift card.
    //Note that the restaurant must be configured  to support these billing methods or 
    //you will receive an error when trying to use them.
    //To get a billing method added to a restaurant, please contact your Olo Customer Success representative.

    amount: number,
    //Amount, including 'tipportion' value, of order total to be applied to this billing account.

    tipportion: number,
    // Amount of tip to be applied to this billing account.

    cardnumber?: string,
    //Credit card number. Required if `billingmethod` is "creditcard"; otherwise omitted.
    // example: '4111111111111111'

    expiryyear?: number,
    // Credit card expiration year. Must be the full 4-digit year, not an abbreviation. 
    //Required if `billingmethod` is "creditcard" or "creditcardtoken"; otherwise omitted.

    expirymonth?: number,
    //Credit card expiration month. 
    //Do not provide any preceding zeros(i.e. 3, not 03).
    //Required if `billingmethod` is "creditcard" or "creditcardtoken"; otherwise omitted.

    cvv?: string,
    //Credit card verification value (CVV). 
    //Required if `billingmethod` is "creditcard"; otherwise omitted.

    streetaddress?: string,
    //Street address associated with the credit card. 
    //Only send if `billingmethod` is "creditcard" and credit card address validation is required 
    //by the brand or restaurant.

    streetaddress2?: string,
    //Street address line 2 associated with the credit card. 
    //Only send if `billingmethod` is "creditcard" and credit card address validation is required 
    //by the brand or restaurant.

    city?: string,
    //City associated with the credit card. 
    //Only send if `billingmethod` is "creditcard" and credit card address validation is required by
    // the brand or restaurant.

    state?: string,
    //State associated with the credit card. 
    //Only send if `billingmethod` is "creditcard" and credit card address validation is required by
    // the brand or restaurant.
    // example: New York

    zip?: string,
    //Zip code associated with the credit card. 
    //Required if `billingmethod` is "creditcard"; otherwise omitted.

    country?: Country,
    //Country code associated with the credit card. Optionally send if `billingmethod` is "creditcard". 
    //If no value is given, the country of the restaurant will be used.

    saveonfile?: SaveOnFile,
    //Determines whether or not to save the `billingmethod` details for a user at supported restaurants. 
    //Once saved, the payment method will be available in the list of billing accounts for future orders.
    //Required for users when the billing method is either "creditcard" or "storedvalue"; otherwise omitted.

    billingaccountid?: integer,
    // Billing account id to be provided when the user wishes to pay with an existing account. 
    //Required if `billingmethod` is "BillingAccount"; otherwise omitted.

    billingschemeid?: number,
    //Billing scheme id to be provided when the user wishes to pay with a new gift card. 
    //Required if `billingmethod` is "storedvalue"; otherwise omitted.

    billingfields?: BillingFieldData[],
    //List of billing fields for the selected `billingmethod`. 
    //Required if `billingmethod` is "storedvalue"; otherwise omitted.

    token?: string,
    //A payment token used for credit card payments. 
    //Required if `billingmethod` is "creditcardtoken"; otherwise omitted.

    cardtype?: CardType,
    //Type of credit card. 
    //This field will only be populated for credit card accounts.
    //Required if `billingmethod` is "creditcardtoken"; otherwise omitted.

    cardlastfour?: string
    // Last four digits of the card number. Required if `billingmethod` is "creditcardtoken"; otherwise omitted.

}