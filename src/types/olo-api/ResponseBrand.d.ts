import { DeliveryModes } from "./DeliveryModes";
import { LoginProviders } from "./LoginProviders";
import { PushNotifications } from "./PushNotifications";
import { TimeModes } from "./TimeModes";

interface ResponseBrand {

    advanceorderdays: number,
    //For Advance(a.k.a.later) orders, this is the number of days in advance in which an order can be placed.
    //nullable: false

    deliveryinstructionsmaxlength: number,
    //The maximum number of characters the brand desires for delivery special instructions.
    //Submitting more characters could truncate the message.

    deliverymodes: DeliveryModes[],
    //type: array

    loginproviders: LoginProviders[],
    //type: array

    pushnotifications: PushNotifications[],
    //type: array

    timemodes: TimeModes[],
    //type: array
}

