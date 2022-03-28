interface BasketProductBatchError {


    productid: number,
    //The restaurant-specific product id associated with the error.

    optionid?: number,
    // The restaurant-specific option id (a.k.a. choice id) associated with the error.

    num: number,
    // Error classification number.
    //example: 251

    message?: string
    //The error message.
    //example: Missing required selections.

}
