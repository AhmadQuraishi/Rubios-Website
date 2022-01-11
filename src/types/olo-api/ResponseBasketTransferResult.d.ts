import { ResponseBasket } from "./ResponseBasket"

interface ResponseBasketTransferResult {

    basket: ResponseBasket
    itemsnottransferred: string[]
    //List of Olo product ids that were unable to be transferred.
}
