import { BasketDonation } from "./BasketDonation";
import { BasketFee } from "./BasketFee";
import { ContextualPricing } from "./ContextualPricing";
import { TaxResult } from "./TaxResult";
import { UpsellGroup } from "./UpsellGroup";

interface ResponseBasketValidation {

    basketid: string,
    //Olo basket id (guid).

    contextualpricing: ContextualPricing,

    customerhandoffcharge: number,
    //Delivery/Dispatch fee for the basket.

    fees: BasketFee[],
    //List of fees that apply to the basket.
    //A fee is added if the basket meets the conditions for the fee defined by the brand.

    donations: BasketDonation[],
    // List of donations that apply to the basket. A donation is added if the basket meets the conditions for the donation defined by the brand.

    posreferenceresponse: string,     //deprecated: true

    readytime: string,
    //Local estimated date and time at which the order will be ready, formatted as "yyyymmdd hh:mm".
    //If the restaurant is using ASAP Order Throttling and the basket has been throttled,
    //this value may be later than the basket `earliestreadytime` field.
    //Please reference this value when displaying the ready time to the customer.

    subtotal: number,
    //Basket subtotal.

    tax: number,
    //Total amount of tax. This is the actual amount as determined by the POS, not an estimate.

    taxes: TaxResult[],
    //type: array
    //List of all taxes applicable to the basket.
    //These are the actual amounts as determined by the POS, not estimates.

    total: number,
    //Basket total including taxes.

    totalfees: number,
    //Total of all fees applied to the basket.

    totaldonations: number,
    //Total of all donations applied to the basket.

    upsellgroups?: UpsellGroup[]
    // List of upsell groups with items that can optionally be added to the basket.

}
