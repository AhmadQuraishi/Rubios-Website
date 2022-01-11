import { BatchProductChoice } from './BatchProductChoice'

interface RequestNewBasketProduct {

    productid: number,                      //format: int64 // Olo product id as retrieved from the restaurant's menu.  example: 921308138
    quantity: number,                         //format: int32 // Quantity of the product.
    options: string,                            // Comma-delimited list of option (choice) ids.  example: '12394871,12093809,12987123'
    specialinstructions?: string                 //Special instructions for the product.  example : Well done
    recipient?: string,                        // Recipient name, i.e. the person who the product is for. Required if basket is a group order.
    customdata?: string
    //Custom passthrough data that will show up when calling one
    //of the order status endpoints. Will not get passed down to the POS. Will
    //not show up in webhook payloads or Order Exports.

    choicecustomfields?: BatchProductChoice[]        //List of custom field values for selected options. If none of

    // the selected options have any custom fields, this property may be omitted.
}
