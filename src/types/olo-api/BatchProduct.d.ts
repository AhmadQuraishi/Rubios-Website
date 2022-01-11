import { BatchProductChoice } from "./BatchProductChoice"

interface BatchProduct {

    productid: number,
    // Olo product id as retrieved from the restaurant's menu.

    quantity: number,
    // Quantity of the product.

    specialinstructions: string,
    ///Special instructions for the product.
    //example: Well done.

    recipient: string,
    //Recipient name, i.e. the person who the product is for. Required if basket is a group order.

    customdata: string,
    //Custom passthrough data that will show up when calling one of the order status endpoints. Will not get passed down to the POS. Will not show up in webhook payloads or Order Exports.

    choices: BatchProductChoice[]
    //List of options (choices) that apply to the product.

}
