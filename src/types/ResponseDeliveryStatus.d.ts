import { Delivery } from "./Delivery";

export interface ResponseDeliveryStatus {

    deliveries: Delivery[],
    //List of Dispatch delivery statuses for the order.
}
