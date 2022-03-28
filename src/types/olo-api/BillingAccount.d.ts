import { CardTypeEnum } from "./olo-api.enums"
import { BillingBalance } from "./BillingBalance"


interface BillingAccount {

    accountid: number,
    //Olo billing account id.

    accounttype: string,
    //Type of account. For credit card, this will be "creditcard". For pay in store, this will be "payinstore". For all stored value accounts, it will be the name of the associated billing scheme.
    //example: Kitchen Sink Giftcard

    cardtype?: CardTypeEnum,
    //Type of credit card. This field will only be populated for credit card accounts.

    cardsuffix?: string,
    //Last four digits of the card number.

    description: string,
    //Description of the billing account.
    //example: Gift card account

    removable: boolean,
    // Whether or not the billing account can be removed.

    expiration?: string,
    // Credit card expiration date formatted as yyyy-MM. This field will only be populated for credit card accounts.

    balance: BillingBalance,


    isdefault: boolean
    // Whether or not this billing account is the user's default billing account. A user can only have one default billing account at a time. This value can only be true for billing accounts of type "creditcard".
}
