import { DispatchDeliveryStatus } from "enums"


export interface Delivery {



    id?: number,
    // Dispatch details id.
    //  nullable: false

    status?: DispatchDeliveryStatus,
    //Status of the Dispatch delivery.

    drivername?: string,
    //Name of the Dispatch driver.

    driverphonenumber?: string,
    //Phone number of the Dispatch driver, in an 11 digit format.

    deliveryservice?: string
    // Name of the Dispatch Service Provider (DSP).
    //example: Speedy Delivery

}