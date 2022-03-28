import { EightySixedChoice } from "./EightySixedChoice";
import { EightySixedProduct } from "./EightySixedProduct";

interface ResponseEightySixedItems {

    choices: EightySixedChoice[],
    //type: array
    //description: List of eighty-sixed (currently unavailable) options (a.k.a. choices) at the restaurant.

    products: EightySixedProduct[]
    //type: array
    //description: List of eighty-sixed (currently unavailable) products at the restaurant.

}

