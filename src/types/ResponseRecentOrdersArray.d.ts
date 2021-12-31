import { ArrivalStatus, DeliveryMode, OrderStatus } from "enums"
import { ResponseDeliveryAddress } from "./ResponseDeliveryAddress"

export interface ResponseRecentOrdersArray {

    id: string,
    //Olo Order guid

    oloid: string
    //Internal Olo Order ID, a non-sequential int64 value.
    // When reaching out to Olo about an order, please provide this id.

    vendorid: number,
    // Restaurant ID.

    status: OrderStatus
    //Status of the order.


    subtotal: number,
    // Order subtotal.

    salestax: number,
    // Total sales tax for the order.

    taxes: string[],
    // List of taxes for the order.
    // items:
    //$ref: '#/TaxResult'

    fees: string[],
    // List of fees for the order.
    //items:
    //$ref: '#/OrderFee'

    totalfees: number,
    // Total fees for the order.

    total: number,
    // Total (including tax, tip, etc.)

    timemode?: TimeMode,
    // The time mode of the basket.

    tip: number,
    //Tip amount.

    mode: string,
    //Legacy value. Currently hardcoded to always be 'orderahead'. deprecated: true

    billingaccountid?: string,
    //Billing account id used to pay for the order.
    // Only returned for orders paid with a single billing account where the account was saved on file.

    billingaccountids?: string[],
    //List of billing account ids used to pay for the order. 
    //Only returned if multiple payment types were used.

    contextualpricing: string,
    //$ref: '#/ContextualPricing'

    deliveryaddress: ResponseDeliveryAddress,

    customfields: string[],
    //List of custom fields for the order.
    //items:
    // $ref: '#/BasketCustomField'

    iseditable: boolean,
    //Whether or not the order can be edited or cancelled.

    discount: number,
    // Total sum of all discounts applied to the order. This value cannot be greater than the subtotal.

    discounts: string[],
    //List of discounts, including coupons and loyalty rewards, applied to the order.
    //items:
    // $ref: '#/Discount'

    orderref: string,
    //Order reference in the calling system (a.k.a. external reference).

    timeplaced: string,
    //Local date and time when the order was placed, formatted as "yyyymmdd hh:mm".

    readytime: string,
    // Local estimated date and time at which the order will be ready, formatted as "yyyymmdd hh:mm".

    vendorname: string,
    // Name of the restaurant where the order was placed.

    vendorextref: string,
    // The restaurant's store number as referenced by the brand.

    deliverymode: DeliveryMode,
    // Handoff mode for the order.

    customerhandoffcharge?: number,
    // Delivery fee for the order. Applies to either in-house delivery or Dispatch.

    arrivalstatus?: ArrivalStatus,
    //Arrival status of the Order. If the order is ineligible to
    // use[Arrival Notifications](#operation / SubmitCustomerArrivalNotification), 
    //this property will be null.Possible values are 
    //"Order Placed"(the order has been placed and is eligible for arrival notifications), 
    //"Arrived"(the customer has indicated that they have arrived), and 
    //"Picked Up"(the restaurant employee has indicated that the food has been handed off).


    hasolopass: boolean,
    //This is a legacy property that should be ignored. deprecated: true

    products: string[],
    // List of products ordered.
    // items:
    //$ref: '#/OrderStatusProduct'

    unavailableproducts: string[]
    //List of products that cannot be reordered due to menu changes.
    //items:
    //$ref: '#/OrderStatusProduct'

    posreferenceresponse: string
    //deprecated: true
}