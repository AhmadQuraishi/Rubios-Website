

interface RequestCreateBasketFromOrder {

  orderref: string,                      //The external order reference supplied by the integration partner. 
  id: string,                           // Olo order id (guid) returned when the order was submitted.
  ignoreunavailableproducts: boolean
  // Whether or not to ignore errors resulting from unavailable
  // products in the order when creating the new basket. If true, any unavailable
  // products in the order will be ignored and not cause an error. If false
  // and the order contains unavailable products, an error will be returned.

}

// required fields are not mentioned specifically in ordering schema