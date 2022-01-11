interface BasketDonation {

    id: number,
    // Olo donation option id. This id is unique to each donation type.

    amount: number,
    //Amount of the donation.

    description?: string,
    //Description of the donation.

    note?: string
    //Explanation of the donation.
}
