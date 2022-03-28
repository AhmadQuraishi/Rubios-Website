import { FaveProductChoice } from "./FaveProductChoice";

interface FaveProduct {



    productid: number,
    // Olo product id. Corresponds to the product id on the restaurant's menu.

    name: string,
    //Name of the product.

    quantity: number,
    // Quantity of the product.

    choices: FaveProductChoice[],
    // Options selected for the product. Any nested options that were selected are included in this array.


    disabled: boolean,
    // Whether or not the product can be ordered.

    recipient?: string,
    //Recipient name, i.e. the person who the product is for.

    specialinstructions?: string
    //Special instructions for the product.


}
