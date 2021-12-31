import { ResponseRecentOrdersArray } from "./ResponseRecentOrdersArray"

export interface ResponseRecentOrders {

    orders: ResponseRecentOrdersArray[]
    // List of recent orders for the user.
}