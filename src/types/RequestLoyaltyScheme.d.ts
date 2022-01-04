interface RequestLoyaltyScheme {


    authtoken: string,                  // description: Olo user authentication token. , //  example: zqd4AeF7lkal12bEPGeLO4sZ4gOleydt
    schemeid: number,                   //format: int64 , // Loyalty scheme id.  // example: 348912891
    membershipnumber: string,           //User's membership number for the loyalty scheme.  // example: '1000200031006483'
    checkbalance: boolean,              //Whether or not to check the account's balance from the provider
    checkrewards: boolean                //Whether or not to check the account's rewards from the provider.

}
