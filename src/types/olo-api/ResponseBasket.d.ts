import { DeliveryMode, TimeMode } from 'src/types/olo-api/olo-api.enums';
import { BasketCoupon } from './BasketCoupon';
import { BasketCustomField } from './BasketCustomField';
import { BasketDonation } from './BasketDonation';
import { BasketFee } from './BasketFee';
import { BasketProduct } from './BasketProduct';
import { ContextualPricing } from './ContextualPricing';
import { Discount } from './Discount';
import { LoyaltyReward } from './LoyaltyReward';
import { ResponseDeliveryAddress } from './ResponseDeliveryAddress';
import { TaxResult } from './TaxResult';
import { ValidationMessage } from './ValidationMessage';

interface ResponseBasket {

    id: string  // Olo basket id (guid).

    allowstip: boolean,
    //Whether or not the user can add a tip to the
    //In order for this to be true, the restaurant must support tipping and
    // the selected handoff mode must support tipping.

    appliedrewards: LoyaltyReward[],
    // List of loyalty rewards applied to the basket.

    contextualpricing: ContextualPricing,

    coupondiscount: number,
    //Total discount provided by the applied coupon.
    //nullable: false
    //example: 1.50


    customerhandoffcharge: number,
    //Estimated delivery/Dispatch fee for the basket.

    customfields: BasketCustomField[],
    //type: array
    //List of custom fields for the restaurant that are tied to the basket.
    //Please pay attention to the `isrequired` and `scope` fields on each custom field
    //to determine whether or not a value is necessary.

    deliveryaddress: ResponseDeliveryAddress,

    deliverymode: DeliveryMode
    // Handoff mode for the basket.

    discount: number,
    //Total sum of all discounts applied to the basket. This value cannot be greater than the subtotal.

    discounts: Discount[],
    //type: array
    // List of discounts applied to the basket.

    donations: BasketDonation[],
    //List of all donations that apply to the basket.

    earliestreadytime: string,
    ///format: date-time
    //Earliest time at which the customer can receive their order, formatted "yyymmdd hh:mm".
    //This field is functionally equivalent to the `leadtimeestimateminutes` field but is presented as a datetime
    //rather than an integer.Please note that this field is only guaranteed to be accurate at the moment the
    //basket is received back from the API.
    //As time goes on, it can become out of date.

    fees: BasketFee[],
    //List of fees that apply to the basket.
    //A fee is added if the basket meets the conditions for the fee defined by the brand.

    isupsellenabled: boolean,
    //Whether or not the basket has upsell enabled.
    //This value will only be true if the brand supports upsell
    //and the basket user has not opted out of upsell.
    //Please reference the[/upsell endpoints](#operation/RetrieveEligibleUpsellItems) to view
    //and add upsell items to a basket.

    leadtimeestimateminutes: number,
    //Number of minutes until the user can receive their order.
    //This field is functionally equivalent to the `earliestreadytime` field but is presented as
    //an integer rather than a datetime.Please note that this field is only guaranteed to be
    //accurate at the moment the basket is received back from the API.As time goes on, it can become out of date.

    mode: string,
    //legacy field. Will always return "orderahead".
    //nullable: false
    //example: orderahead
    //deprecated: true

    products: BasketProduct[],
    //type: array
    //List of products that have already been added to the basket.

    salestax: number,
    //Total of all taxes applicable to the basket. Prior to calling basket validation,
    // this value will be an estimate.After validating the basket, this will be the actual tax returned by the POS,
    //which is the ultimate source of authority regarding any discrepancies.
    //Any material changes to the basket after validation will flip this back to an estimate.

    subtotal: number,
    //Subtotal of all products and modifiers in the order. Prior to calling basket validation,
    //this value will be a sum of all products and modifier costs in the basket.
    //After validation, this will be the actual subtotal returned by the POS,
    //which is the ultimate source of authority regarding any discrepancies.
    //Any material changes to the basket after validation will flip this back to an sum - based estimate.

    suggestedtipamount: number,
    //The amount calculated for suggested tip utilizing the `suggestedtippercentage` and current basket subtotal.

    suggestedtippercentage: number,
    //The suggested tip percentage as set by the brand.

    taxes: TaxResult[],
    //List of all taxes applicable to the basket. Prior to calling basket validation,
    //this value will be an estimate.After validating the basket,
    //this will be the actual tax returned by the POS,
    //which is the ultimate source of authority regarding any discrepancies.
    //Any material changes to the basket after validation will flip this back to an estimate.

    timemode: TimeMode,
    //Time mode of the basket.

    timewanted?: string,
    //Time the user wants to receive the order, formatted "yyyymmdd hh:mm".
    //If placing an Advance order, this must be set via the[Time Wanted endpoint](#operation / SetTimeWanted).
    //If the order is not Advance, it will be left null. Required but nullable

    tip: number,   //Tip amount.

    total: number,
    //Total cost of the order. Prior to calling basket validation, this value will be an estimate.
    //After validating the basket, this will be the actual total returned by the POS,
    //which is the ultimate source of authority regarding any discrepancies.
    //Any material changes to the basket after validation will flip this back to an estimate.

    totalfees: number,
    //Total of all fees applied to the basket.

    validationmessages: ValidationMessage[],
    // type: array
    //List of validation messages for the basket, generally used to inform about any potential issues with the basket.
    //These messages are not persisted across requests.

    vendorid: number,
    //Restaurant id the basket is tied to.

    vendoronline: boolean,
    //Whether or not the restaurant tied to the basket is available to take orders.
    //If the restaurant is temporarily unavailable or is unable to connect to the POS,
    //this will be "false".If this is "false" at the time an order attempt is made,
    //it is guaranteed to fail.Please note that this field functions the same
    // as the `isavailable` field in the[restaurant model](#tag / retrieveConfiguration).

    wasupsold: boolean,
    //Whether or not a collection of eligible upsell items has already been returned for the specified basket.


    coupon?: BasketCoupon,

    contactnumber?: string,
    //User's contact number. This will only be populated if the basket is associated with a user.



}
