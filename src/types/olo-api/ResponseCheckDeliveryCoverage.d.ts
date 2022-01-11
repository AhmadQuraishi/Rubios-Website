


interface ResponseCheckDeliveryCoverage {
    candeliver: boolean,
    message?: string
    //If the restaurant cannot deliver to the specified address,
    //this will be populated with a customer friendly reason explaining why.
    // nullable: false
    //example: Delivery address is outside of our delivery area.
}
