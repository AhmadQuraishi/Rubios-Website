
interface LoyaltyReward {



    membershipid: number,
    // Olo's id for the loyalty scheme membership associated with this reward.

    reference: string,
    // Loyalty provider's external id for all instances of this reward. For example, if multiple users have a "buy one get one free" reward, each specific reward would have the same `reference` but the `externalreference` would be unique to each user. Please use this field when redeeming the reward.

    label: string,
    // Name of the reward.
    // example: Free cookie

    type: string,
    //The type of reward.
    //example: freeitem

    value: number,
    // The value of the reward.

    rewardid?: number,
    // Olo id for the reward.

    applied: boolean,
    //Indicates whether the reward is applied.

    quantityavailable: number,
    //The quantity available of the reward.

    quantityapplied: number,
    // The quantity applied to the reward.

    description?: string,
    // Description of the reward.
    //example: Receive a free cookie with any purchase.

    fineprint?: string,
    // Fine print of the reward.
    //example: Must make a purchase to redeem.

    imageurl?: string,
    //Image URL for the reward.


    validminutes?: number,
    // How long the reward is valid once it has been selected.

    availableonline: boolean,
    // Indicates whether or not the reward is available online.

    availableoffline: boolean,
    //Indicates whether or not the reward is available offline. This field is rarely used, please reference `availableonline` instead.

    expirationdate?: string,
    // Date the reward expires.
    //example: 20210731 00:00

    externalreference: string,
    // User specific external reference for this reward. Please use the `reference` when redeeming the reward.

    vendorrefs: string[],
    // List of external references of restaurants the reward is valid at.

    items: number[],
    // Items to which the reward applies.
    // items:
    //type: integer
    // example: 33598716

    categories: number[]
    //Categories to which the reward applies.
    // items:
    // type: integer
    // example: 315648954

}
