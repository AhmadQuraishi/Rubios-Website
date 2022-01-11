import { EmailReceiptsEnum, FollowUpsEnum, MarketingSMSEnum, OptinEnum, UpSellEnum } from "./olo-api.enums"

interface ResponseContactOptions {



    marketingsms: MarketingSMSEnum,
    //Whether or not the user would like to receive deals through SMS.

    optin: OptinEnum,
    // Whether or not the user would like to receive deals newsletters (i.e. marketing emails).

    upsell: UpSellEnum,
    // Whether or not the user would like to see prompts for upsell items.

    emailreceipts: EmailReceiptsEnum,
    // Whether or not the user would like to receive order notification emails.

    followups: FollowUpsEnum
    //Whether or not the user would like to allow the brand to request order feedback.
}
