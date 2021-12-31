export interface RestaurantDisclaimer {



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
    images: array
    // List of images associated with the disclaimer.
    //items:
    //$ref: '#/Image'
}