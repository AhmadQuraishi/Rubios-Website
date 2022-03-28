interface UpsellItem {

    id: number,
    // Olo product id. Corresponds to the product on the restaurant's menu.

    name: string,
    //Name of the upsell product.
    //example: Cookie

    cost: string,
    //Cost of the upsell product.

    shortdescription?: string,
    // Short description of the upsell product.
    //example: Oatmeal Raisin Cookie

    minquantity?: number,
    // Minimum quantity of the upsell product that can be in a single order. Please note that for values above zero this does not mean that the product is required to be in every order. Instead it means that if it is in an order, it must have a quantity greater than or equal to the minimum quantity.
    // nullable: false

    maxquantity?: number
    // Maximum quantity of the upsell product that can be in a single order.
    // nullable: false
}
