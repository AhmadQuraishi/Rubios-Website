
interface RequestCardBalanceRetrieval {

    cardnumber: string,                  //Card number to retrieve balance for
    pin: string                          //Card pin number. Only to be provided if the billing scheme requires a pin.
}
