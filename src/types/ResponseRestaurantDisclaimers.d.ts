import { RestaurantDisclaimer } from "./RestaurantDisclaimer";

export interface ResponseRestaurantDisclaimers {

    imagepath?: string,   //Base image path for images in the disclaimers.  // required but also nullable: true
    disclaimers: RestaurantDisclaimer[]
    //type: array
    //description: List of disclaimers.


}
