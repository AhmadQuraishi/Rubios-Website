
import { RequestNewBasketProductByChainId } from './RequestNewBasketProductByChainId'

interface RequestBasketProductByChainIdBatch {

    products: Array<RequestNewBasketProductByChainId>,                      // List of products to add to the basket.    items:   $ref: '#/RequestNewBasketProductByChainId'

}