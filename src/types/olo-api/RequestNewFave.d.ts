interface RequestNewFave {


    basketid: string,   //Basket id that the user would like to save as a fave.
    description: string,   //Description/name of the fave. example: Favorite lunch
    isdefault?: boolean

    //Whether or not the fave is the user's default fave.
    //A user can only have one default fave at a time.
    //If the user already has a default fave set
    //and they add a new one with `isdefault` set to true, their previous default fave will be set to a regular fave.
    // nullable: false
}
