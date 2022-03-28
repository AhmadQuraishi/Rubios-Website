import { DeliveryModeEnum } from "./olo-api.enums";
import { TimeModes } from './TimeModes'

interface DeliveryModes {


    isdefault: boolean,
    //Whether or not a given deliverymode is the default deliverymode

    label: string,
    //The label to display to customers for a given deliverymode
    //example: Curbside Pickup

    timemodes: TimeModes,

    type: DeliveryModeEnum
    // The deliverymode (a.k.a. handoff method) value to be used when submitting orders.


}
