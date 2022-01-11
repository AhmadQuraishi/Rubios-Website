

interface RequestCreateBasketFromFave {

  faveid: number,                      //format: int64  //Id of the favorite to add to the basket.
  ignoreunavailableproducts?: boolean
  // Whether or not to ignore errors resulting from unavailable
  // products in the fav when creating the new basket. If true, any unavailable
  // products in the fav will be ignored and not cause an error. If false
  // and the fav contains unavailable products, an error will be returned.

}

