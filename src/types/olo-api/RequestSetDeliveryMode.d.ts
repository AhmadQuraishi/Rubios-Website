import { DeliveryMode } from '../enums';


interface RequestSetDeliveryMode {

    deliverymode: DeliveryMode

    // Delivery mode (a.k.a. handoff mode) to set the basket to, provided
    // the mode is supported by the restaurant. When attempting to
    // set the delivery mode to "delivery" or "dispatch", the basket must already
    // have a delivery address set.

}


