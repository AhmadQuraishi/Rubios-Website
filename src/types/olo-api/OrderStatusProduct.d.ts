import { OrderStatusProductChoice } from "./OrderStatusProductChoice"

interface OrderStatusProduct {


    name: string
    // Name of the product.
    //example: Sandwich

    quantity: number,
    // Quantity ordered of the product.

    totalcost: number,
    //Total cost of the product.

    specialinstructions?: string,
    // Special instructions for the product.

    custompassthroughdata?: string,
    // Custom passthrough data that was provided when the product was added to the basket.
    // Does not get passed down to the POS.Does not show up in webhook payloads or Order Exports.

    choices: OrderStatusProductChoice[]
    //: Selected options for the product.

}
