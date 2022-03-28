import { BasketChoice } from "./BasketChoice"

interface BasketProduct {


    id: number,
    //Olo basket product id. This id is unique to each basket and is used for any modifications to the product within this basket.

    productId: number,
    // Olo product id. This is the product id from the restaurant's menu.

    name: string,
    //Name of the product.

    quantity: number,
    //Quantity of the product in the basket.

    basecost: number,
    // Unit cost of the product without any modifiers.

    totalcost: number,
    //Total cost of the product including product quantity and any additional option costs.

    specialinstructions?: string,
    //Special instructions for the product.

    customdata?: string,
    //Custom passthrough data that will show up when calling one of the order status endpoints. Will not get passed down to the POS. Will not show up in webhook payloads or Order Exports.

    recipient?: string,
    //Recipient name (who the product is for).

    choices: BasketChoice[]
    // List of choices (options) that have been chosen for this product within the basket.

}
