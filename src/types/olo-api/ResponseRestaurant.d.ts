import { ContextualPricing } from "./ContextualPricing";
import { DeliveryFeeTier } from "./DeliveryFeeTier";
import { MetadataItem } from "./MetadataItem";
import { RestaurantCalendar } from "./RestaurantCalendar";
import { RestaurantCustomField } from "./RestaurantCustomField";
import { RestaurantCustomLabel } from "./RestaurantCustomLabel";

interface ResponseRestaurant {


    id: number,
    //Olo restaurant id. Also referred to as "vendor id". Unique across brands.
    //This id is used in all routes that reference "vendorid" or "restaurantid".
    acceptsordersbeforeopening: boolean,
    //Whether or not the restaurant accepts orders before opening.

    acceptsordersuntilclosing: boolean,
    //Whether or not the restaurant accepts orders until closing.

    advanceonly: boolean,
    //Whether or not the restaurant only accepts Advance (a.k.a. later) orders.

    advanceorderdays: number,
    //For Advance (a.k.a. later) orders, this is the number of days in advance in which an order can be placed.

    allowhandoffchoiceatmanualfire: boolean,
    //Whether or not an order's handoff mode can be changed at the time the order is to
    //be fired down to the POS([Manual Fire endpoint](#operation / SubmitManualFireOrder)).
    //For Manual Fire orders only.

    attributes: string[],
    //List of location attributes for the restaurant.
    //These are generally configured by the brand on a per - restaurant basis.

    availabilitymessage: string,
    //Customer facing message that indicates
    //if the restaurant is temporarily closed or has online ordering temporarily disabled.

    brand: string,
    // Olo's internal name of the brand associated with the restaurant.
    // Usually comes across all lowercase with no punctuation and no spaces in
    //between multiple words. (Ex. Bob's Coffee -> bobscoffee).

    candeliver: boolean,
    //Whether or not the restaurant supports the handoff mode "Delivery" (ie. in-house delivery) for orders.
    //Please note that this does not consider whether or not the restaurant supports the handoff mode "Dispatch".

    canpickup: boolean,
    //Whether or not the restaurant supports the handoff mode "Counter Pickup" (a.k.a. Pickup).

    city: string,
    //The restaurant's city.

    contextualpricing: ContextualPricing,

    country: string,
    //The restaurant's country (eg. US, CA).

    crossstreet: string,
    //Closest cross street to the restaurant.

    customerfacingmessage: string,
    //Customer facing message that the restaurant wishes to display.
    //Typically used for greetings, deal notifications, and any extraordinary circumstances.

    customfields: RestaurantCustomField[],

    // List of custom fields defined for the restaurant.
    //To see how to set these fields,
    //please reference the[Custom Fields endpoint](#operation / SetBasketCustomFieldValue).


    deliveryarea: string,
    //Description of the area the restaurant delivers to.
    //Please note that this does not consider "Dispatch", only in -house delivery.

    deliverydelayalertenabled: boolean,
    //Whether or not the restaurant has a delivery delay alert enabled.

    deliverydelayalertmessage: string,
    //The message that can be used to alert the guest that a delivery delay alert is enabled.
    //This field will be null when `deliverydelayalertenabled` is`false`.
    //The message changes based on the type of delivery delay alert(default message or inclement weather).

    deliveryfee: number,
    //Fee for delivery. This will return as 0 if the restaurant has multiple fee tiers.
    //Please note that this does not apply to Dispatch, only in -house delivery.

    deliveryfeetiers: DeliveryFeeTier[],
    //List of fee tiers for delivery. Please note that this does not apply to Dispatch, only in-house delivery.

    distance: number,
    //Distance in miles from the set of coordinates provided to [GET /restaurants/near](#operation/FindNearbyParticipatingRestaurants)
    // or[GET / restaurants / deliveringto](#operation / FindNearbyParticipatingRestaurantswithInHouseDelivery), otherwise 0.

    extref: string,
    //The restaurant's external reference (a.k.a. identifier).
    //This field is not returned for projects that are associated with multiple brands or Rails enabled.

    hasolopass: boolean,
    //This is a legacy property that should be ignored , // deprecated: true

    isavailable: boolean,
    //Whether or not the restaurant is available to take orders.
    //If the restaurant is temporarily unavailable or is unable to connect to its POS, this field will be "false".
    //If this field is "false" at the time an order is placed, the order is guaranteed to fail.
    //Please note that this field functions the same as the `vendoronline` field for baskets associated with the restaurant.

    iscurrentlyopen: boolean,
    //Whether or not the restaurant is open based on the business hours.
    // If the restaurant is open, this field will be "true" else "false".
    //This also respects business hours overrides.

    labels: RestaurantCustomLabel[],
    //List of custom labels for handoff modes and thank you messages as determined by the restaurant's brand.

    latitude: number,
    //The restaurant's latitude.

    longitude: string,
    //The restaurant's longitude.

    maximumpayinstoreorder: number,
    //Maximum total amount for any Pay in Store (a.k.a. cash) order.
    //Only relevant if the restaurant supports the billing scheme Pay In Store.

    metadata: MetadataItem[],
    // description: Restaurant metadata (array of key/value pairs) that has a very limited use case.
    // If interested in using restaurant - level metadata,
    //please discuss your project requirements with your Olo Customer Success representative.

    minimumdeliveryorder: number,
    //Minimum total amount for an order to be eligible for delivery.
    //Please note that this does not apply to "Dispatch", only in -house delivery.

    minimumpickuporder: number,
    //Minimum total amount for an order to be eligible for pickup.

    mobileurl: sring,
    //f the API credentials are set to show URLs (enabled by default),
    //this will return the URL to the mobile ordering site.

    name: string,
    //Olo's configured name for the restaurant, generally set with guidance from the brand.

    productrecipientnamelabel: string,
    //Label used to describe the recipient name attached to a product. The label can be configured by each brand.

    requiresphonenumber: boolean,
    //Whether or not the restaurant requires a phone number to place an order.
    //Please note that for orders placed via the Ordering API, this  requirement is not enforced.
    //However, if this field comes back as "true", please try to send a contact number if possible.

    slug: string,
    //Olo's configured name for the restaurant represented by a URL friendly slug.

    specialinstructionsmaxlength: number,
    //Max character length of product special instructions for an order a customer is allowed to enter.
    //Does not apply to delivery or Dispatch special instructions.

    state: string,
    //The restaurant's state.

    storename: string,
    //tandard name of the brand's restaurants.
    //If none is provided, this will default to the name of the brand.More display friendly than the brand field.

    streetaddress: string,
    //he restaurant's street address.

    suggestedtippercentage: number,
    //The suggested tip percentage as set by the brand.

    supportedcardtypes: string,
    //List of card types (full names) the restaurant supports, delimited by '/'.
    //example: American Express/Discover/MasterCard/Visa

    supportedcountries: string[],
    //List of countries supported by the restaurant.

    supportedtimemodes: string[],
    //List of time modes supported by the restaurant (see the [Time Wanted endpoint](#operation/SetTimeWanted) for how to apply advance and manual fire time modes).
    //Note that if ASAP(a.k.a.immediate) is not supported, a basket's time mode will default to one that is supported.

    supportedarrivalmessagehandoffmodes: string[],
    //List of handoff modes that support sending a message along with an arrival notification.

    supportsbaskettransfers: boolean,
    //Whether or not the restaurant supports basket transfers to another restaurant.
    //When false, the[Basket Transfer endpoint](#operation / TransferBaskettoDifferentRestaurant)
    //will return an error for baskets associated with the restaurant.

    supportscoupons: boolean,
    //Whether or not the restaurant supports Olo coupon codes.

    supportscurbside: boolean,
    //Whether or not the restaurant supports the handoff mode "Curbside Pickup".

    supportsdinein: boolean,
    //Whether or not the restaurant supports the handoff mode "dinein".

    supportsdispatch: boolean,
    //hether or not the restaurant supports the handoff mode "Dispatch".
    //To learn more about Dispatch delivery, please check out the [Dispatch tutorial](#section/Tutorials/Dispatch).

    supportsdrivethru: boolean,
    //Whether or not the restaurant supports the handoff mode "Drive-Thru".

    supportsfeedback: boolean,
    //Whether or not the restaurant allows user feedback.

    supportsgrouporders: boolean,
    // Whether or not the restaurant supports group orders.
    //If this is "false", group orders cannot be created at the restaurant nor can a basket associated with the restaurant be used in a group order.

    supportsguestordering: boolean,
    //Whether or not the restaurant allows guests (customers with no user account) to place an order.

    supportsloyalty: boolean,
    // Whether or not the restaurant accepts any loyalty schemes.

    supportsmanualfire: boolean,
    //Whether or not the restaurant supports manual fire orders.
    //This must be true for both the restaurant and the brand in order for the restaurant to support them.
    //Manual Fire is an order time mode that allows orders to be fired at a precise desired moment.

    supportsnationalmenu: boolean,
    //Whether or not a brand wants to surface their menu even when online ordering is disabled.

    supportsonlineordering: boolean,
    //Whether or not the restaurant supports online ordering.
    //If false, you will not be able to create an online order at this restaurant.

    supportsproductrecipientnames: boolean,
    //Whether or not the restaurant allows customers to set a recipient name for each product ordered.
    //Some POS systems will recognize these names and allow them to be printed out on the receipt.

    supportsspecialinstructions: boolean,
    //Whether or not the restaurant allows customers to enter product special instructions for orders.
    // Does not apply to delivery or Dispatch special instructions.

    supportssplitpayments: boolean,
    //Whether or not the restaurant allows split (a.k.a. multiple) payments for orders.
    //Please note that the[/submit/multiplepayments](#operation / SubmitOrderwithMultiplePayments) endpoint will not
    //allow multiple payment methods to be used when this field is false.

    supportstip: boolean,
    // Whether or not the restaurant allows tipping.
    //Please note that a basket may still not allow tips if the associated handoff mode does not support tipping.

    telephone: string,
    //The restaurant's phone number. Will be formatted like (xxx) xxx-xxxx.

    url: string,
    //If the API credentials are set to show URLs (enabled by default),
    //this will return the URL to the desktop ordering site.

    utcoffset: number,
    //UTC offset of the timezone the restaurant is in. This factors in Daylight Savings time.

    zip: string,
    //The restaurant's zip code.


    showcalories?: boolean,
    //Whether or not the restaurant wants to display calorie information for products.
    // When false, calorie information is omitted from the menu and product endpoints.

    calendars?: RestaurantCalendar[],
    //List of restaurant operating hours for multiple types of calendars over the date range specified in the request.
    //Please note that this array can only be returned for requests sent to the following endpoints:

    //* [Find Nearby Participating Restaurants](#operation/FindNearbyParticipatingRestaurants)
    //* [Find Nearby Participating Restaurants with In-House Delivery](#operation/FindNearbyParticipatingRestaurantswithInHouseDelivery)
}
