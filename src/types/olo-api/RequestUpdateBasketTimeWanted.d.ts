

export interface RequestUpdateBasketTimeWanted {

    ismanualfire: boolean,
    // Whether or not the basket is to become a Manual Fire order.
    // If true, all other fields are to be omitted.When you submit an order
    // set to Manual Fire, it won't get sent to the POS until /manualfire is
    // explicitly called.Often used as a customer check -in feature.

    year: number,                      //4 digit year for the time wanted.
    month: number,                     //Month without any leading zero for the time wanted.
    day: number,                      //Day without any leading zero for the time wanted.
    hour: number,                     //Hour without any leading zero for the time wanted.
    minute: number                    //Minute without any leading zero for the time wanted.

}
