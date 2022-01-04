
import { BasketProductByChainIdBatchError } from "./BasketProductByChainIdBatchError";
import { ResponseBasket } from "./ResponseBasket";
export interface ResponseBasketProductByChainIdBatchResult {

  basket: ResponseBasket,

  errors: BasketProductByChainIdBatchError[]
  //List of errors that occurred when attempting to add or edit products.

}
