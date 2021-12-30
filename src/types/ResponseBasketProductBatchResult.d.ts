
import { ResponseBasket } from "./ResponseBasket";
export interface ResponseBasketProductBatchResult {

    basket: ResponseBasket,

    errors: string[]
    //List of errors that occurred when attempting to add or edit products.
    // items:
    //$ref: '#/BasketProductBatchError'

}
