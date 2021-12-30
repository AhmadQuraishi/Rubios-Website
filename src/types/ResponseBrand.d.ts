export interface ResponseBrand {

    advanceorderdays: number,
    //For Advance(a.k.a.later) orders, this is the number of days in advance in which an order can be placed.
    //nullable: false

    deliveryinstructionsmaxlength: number,
    //The maximum number of characters the brand desires for delivery special instructions.
    //Submitting more characters could truncate the message.

    deliverymodes: string[],
    //type: array
    //items:
    //$ref: '#/DeliveryModes']
    loginproviders: string[],
    //type: array
    //items:
    //$ref: '#/LoginProviders'
    pushnotifications: string[],
    //type: array
    //items:
    //$ref: '#/PushNotifications'
    timemodes: string[],
    //type: array
    //items:
    //$ref: '#/TimeModes'
}

