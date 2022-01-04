
import { BasketProductBatchError } from "./BasketProductBatchError";
import { ResponseBasket } from "./ResponseBasket";
export interface ResponseBasketProductBatchResult {

    basket: ResponseBasket,

    errors: BasketProductBatchError[]
    //List of errors that occurred when attempting to add or edit products.

}
