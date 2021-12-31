import { EmailReceipts, FollowUps, MarketingSMS, Optin, UpSell } from "enums"

export interface ResponseContactOptions {



    marketingsms: MarketingSMS,
    //Whether or not the user would like to receive deals through SMS.

    optin: Optin,
    // Whether or not the user would like to receive deals newsletters (i.e. marketing emails).

    upsell: UpSell,
    // Whether or not the user would like to see prompts for upsell items.

    emailreceipts: EmailReceipts,
    // Whether or not the user would like to receive order notification emails.

    followups: FollowUps
    //Whether or not the user would like to allow the brand to request order feedback.
}
