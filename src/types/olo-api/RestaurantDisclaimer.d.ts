import { Image } from "./Image";

interface RestaurantDisclaimer {



    code?: string,
    //Code of the disclaimer.
    //nullable: true

    name?: string,
    //Name of the disclaimer.
    // nullable: true
    // example: FDA Statement

    disclaimer: string,
    //Disclaimer text.
    //nullable: false
    //example: FDA guideline statement.

    images: Image[]
    // List of images associated with the disclaimer.
}
