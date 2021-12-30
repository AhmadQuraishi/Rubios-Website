export interface ResponseRestaurantDisclaimers {

    imagepath?: string,   //Base image path for images in the disclaimers.  // required but also nullable: true
    disclaimers: string[]
    //type: array
    //description: List of disclaimers.
    //items:
    //$ref: '#/RestaurantDisclaimer'



}
