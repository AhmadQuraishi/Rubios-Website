import { BillingMethod, UserType, Country, CardType, SaveOnFile } from '../enums'
import { BillingFieldData } from './BillingFieldData';

interface RequestBasketSubmit {

    authtoken?: string,                  //Olo user authentication token. Required for users; otherwise omitted.

    billingmethod: BillingMethod,
    // Name of the billing method.Always required.Possible values
    // are "creditcard", "creditcardonfile"(a.k.a.most recent credit card on
    // file), "creditcardtoken", "billingaccount"(a previously saved account), "cash"(a.k.a.pay
    // in store), "storedvalue"(a.k.a.gift card), and "prepaid".Note that
    // the restaurant must be configured to support these billing methods or
    // you will receive an error when trying to use them.To get a billing method
    // added to a restaurant, please contact your Olo Customer Success representative.

    billingaccountid?: number,
    // Billing account id to be provided when the user wishes to pay
    // with an existing account. Required if "billingmethod" is "BillingAccount";
    // otherwise omitted.,

    billingschemeid?: string,
    // Billing scheme id to be provided when the user wishes to pay
    // with a new gift card. Required if "billingmethod" is "storedvalue"; otherwise
    // omitted.

    billingfields?: BillingFieldData[],
    // List of billing fields for the selected "billingmethod". Required
    // if "billingmethod" is "storedvalue"; otherwise omitted.

    usertype: UserType,         //Type of customer.
    firstname?: string,          //First name.Required for guests; otherwise omitted.
    lastname?: string,           //Last name.Required for guests; otherwise omitted.
    emailaddress?: string,       // Email address.Required for guests; otherwise omitted.

    contactnumber?: string,
    // Phone number in an 11 digit format.If specified, this contact number will be applied to the user or guest.
    // Orders with a handoff mode of "dispatch" require a valid phone number.
    // If the user does not have a phone number on file or this is a guest order, this field is required.

    reference?: string,         //user reference in the calling system(a.k.a.user external reference).
    cardnumber?: string,       //Credit card number.Required if "billingmethod" is "creditcard"; otherwise omitted.

    expiryyear?: number,

    // Credit card expiration year.Must be the full 4 digit year.Required if `billingmethod` is "creditcard" or "creditcardtoken";
    // otherwise omitted.
    expirymonth?: number,
    //Credit card expiration month. Do not provide any preceding zeros (i.e. 3, not 03).
    //Required if `billingmethod` is "creditcard" or "creditcardtoken"; otherwise omitted.

    cvv?: string,        //Credit card verification value(CVV).Required if `billingmethod` is "creditcard"; otherwise omitted.
    streetaddress?: string,
    // Street address associated with the credit card.Only send if `billingmethod` is "creditcard" or "creditcardtoken"
    // and credit card address validation is required by the brand or restaurant.
    // example: 26 Broadway

    streetaddress2?: string,
    // Street address line 2 associated with the credit card.Only send if `billingmethod` is "creditcard" or "creditcardtoken"
    // and credit card address validation is required by the brand or restaurant.
    // example: Unit 4

    city?: string,
    // City associated with the credit card.Only send if `billingmethod` is "creditcard" or "creditcardtoken"
    // and credit card address validation is required by the brand or restaurant.

    state?: string,
    // State associated with the credit card.Only send if `billingmethod` is "creditcard" or "creditcardtoken"
    // and credit card address validation is required by the brand or restaurant.

    zip?: string,
    // Zip code associated with the credit card.Only send if `billingmethod` is "creditcard" or "creditcardtoken"
    // and credit card address validation is required by the brand or restaurant.

    country?: Country,

    // Country code associated with the credit card.Optionally send if `billingmethod` is "creditcard" or "creditcardtoken".
    // If no value is given, the country of the restaurant will be used.

    saveonfile?: SaveOnFile,
    // Determines whether or not to save the `billingmethod` details for a user at supported restaurants.
    // Once saved, the payment method will be available in the list of billing accounts for future orders.
    // Required for users when the billing method is "creditcard", "creditcardtoken", or "storedvalue"; otherwise omitted.

    orderref?: string,
    // Order reference in the calling system(a.k.a.order external reference).
    // Required for Rails partners; optional otherwise.This allows order status to be looked up later by this reference.
    //example: zie892 - se8912nd34iae

    prepaidtransactionid?: string,
    // Specifies a transaction identifier in the calling system.Required if `billingmethod` is "prepaid"; otherwise omitted.

    prepaiddescription?: string,
    //Specifies a customer friendly description of the payment.Required if `billingmethod` is "prepaid"; otherwise omitted.
    //example: VISA x - 1234

    customdata?: string[]
    // A limited use case list of passthrough data that, under certain conditions(and only when supported by the underlying POS),
    // can allow extra information to get added to email templates and printed out on receipts.
    // items:$ref: '#/OrderCustomData'

    guestoptin?: boolean,
    //Guest has opted in to marketing communication.Required for non - Rails guests; otherwise omitted.

    receivinguser?: {    //Specify a separate customer that will receive the order.

        firstname: string,
        lastname: string,
        emailaddress: string,
        contactnumber: string,
    }

    token?: string,
    //A payment token used for credit card payments. Required if `billingmethod` is "creditcardtoken"; otherwise omitted.

    cardtype?: CardType

    // Type of credit card.This field will only be populated for credit card accounts.
    // Required if `billingmethod` is "creditcardtoken"; otherwise omitted.

    cardlastfour?: string
    //Last four digits of the card number. Required if `billingmethod` is "creditcardtoken"; otherwise omitted.


}
