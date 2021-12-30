export interface ResponseBasketValidation {

    basketid: string,
    //Olo basket id (guid).

    contextualpricing: string,
    //$ref: '#/ContextualPricing'

    customerhandoffcharge: number,
    //Delivery/Dispatch fee for the basket.

    fees: string[],
    //List of fees that apply to the basket.
    //A fee is added if the basket meets the conditions for the fee defined by the brand.
    //items:
    //$ref: '#/BasketFee'

    donations: string[],
    // List of donations that apply to the basket. A donation is added if the basket meets the conditions for the donation defined by the brand.
    //items:
    //$ref: '#/BasketDonation'

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

    taxes: string[],
    //type: array
    //List of all taxes applicable to the basket. 
    //These are the actual amounts as determined by the POS, not estimates.
    //items:
    //$ref: '#/TaxResult'

    total: number,
    //Basket total including taxes.

    totalfees: number,
    //Total of all fees applied to the basket.

    totaldonations: number,
    //Total of all donations applied to the basket.

    upsellgroups?: string[]
    // List of upsell groups with items that can optionally be added to the basket.
    //items:
    //$ref: '#/UpsellGroup'

}