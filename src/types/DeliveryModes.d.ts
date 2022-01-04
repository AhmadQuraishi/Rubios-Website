import { DeliveryMode } from "enums";
import { TimeModes } from './TimeModes'

export interface DeliveryModes {


    isdefault: boolean,
    //Whether or not a given deliverymode is the default deliverymode

    label: string,
    //The label to display to customers for a given deliverymode
    //example: Curbside Pickup

    timemodes: TimeModes,

    type: DeliveryMode
    // The deliverymode (a.k.a. handoff method) value to be used when submitting orders.


}