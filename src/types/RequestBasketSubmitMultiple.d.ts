import { BillingMethod, UserType, Country, CardType, SaveOnFile } from '../enums'
import { BillingAccountData } from './BillingAccountData';

export interface RequestBasketSubmitMultiple {

    authtoken?: string,                  //Olo user authentication token. Required for users; otherwise omitted.
    usertype: UserType,         //Type of customer.
    firstname?: string,          //First name.Required for guests; otherwise omitted.
    lastname?: string,           //Last name.Required for guests; otherwise omitted.
    emailaddress?: string,       // Email address.Required for guests; otherwise omitted.

    contactnumber?: string,
    // Phone number in an 11 digit format.If specified, this contact number will be applied to the user or guest.
    // Orders with a handoff mode of "dispatch" require a valid phone number.
    // If the user does not have a phone number on file or this is a guest order, this field is required.

    reference?: string,         //user reference in the calling system(a.k.a.user external reference).
    orderref?: string,
    // Order reference in the calling system(a.k.a.order external reference).
    // Required for Rails partners; optional otherwise.This allows order status to be looked up later by this reference.
    //example: zie892 - se8912nd34iae

    customdata?: string[]
    // A limited use case list of passthrough data that, under certain conditions(and only when supported by the underlying POS),
    // can allow extra information to get added to email templates and printed out on receipts.
    // items:$ref: '#/OrderCustomData'

    guestoptin?: boolean,
    //Guest has opted in to marketing communication.Required for non - Rails guests; otherwise omitted.

    billingaccounts?: BillingAccountData[]
    //List of billing accounts to use for order payment.

}



