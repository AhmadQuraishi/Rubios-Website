
import { ResponseBasket } from "./ResponseBasket";
export interface ResponseBasketProductByChainIdBatchResult {

  basket: ResponseBasket,

  errors: string[]
  //List of errors that occurred when attempting to add or edit products.
  // items:
  //$ref: '#/BasketProductByChainIdBatchError'

}
