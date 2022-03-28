interface BasketProductByChainIdBatchError {


    chainproductid: number,
    // The Olo chain wide product id associated with the error.

    productid: number,
    // The restaurant-specific product id associated with the error.

    optionid: number,
    //The restaurant-specific option id (a.k.a. choice id) associated with the error.

    num: number,
    // Error classification number.
    // example: 250

    message?: string
    //The error message.
    //example: Menu item no longer available.
}
