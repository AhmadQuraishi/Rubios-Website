import { NewBasketProductChoiceByChainId } from "./NewBasketProductChoiceByChainId";

interface RequestNewBasketProductByChainId {

    chainproductid: number,                  //format: int64 // Olo chain wide product id as retrieved from the restaurant's menu.example: 23901384
    quantity: number,                         //format: int32 // Quantity of the product.
    choices: NewBasketProductChoiceByChainId[],                        // List of top level options (choices) that apply to the product.
    specialinstructions?: string                 //Special instructions for the product. example Lightly toasted
    recipient?: string,                        // Recipient name, i.e. the person who the product is for. Required if basket is a group order.
    customdata?: string
    //Custom passthrough data that will show up when calling one
    //of the order status endpoints. Will not get passed down to the POS. Will
    //not show up in webhook payloads or Order Exports.
}
