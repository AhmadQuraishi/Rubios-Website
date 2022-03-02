

export interface RequestCreateBasket {

  vendorid: number,                                       //format: int64 ,  Restaurant id to associate with the basket. 
  authtoken?: string                                     // If specified, will link the basket to the specified user account.

}

