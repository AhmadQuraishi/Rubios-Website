import { BatchProduct } from "./BatchProduct";


interface RequestBasketProductBatch {
    products: BatchProduct[],
    // List of products to add to the basket.
    replaceContents: boolean
    // Replace Existing bakste content or not
}