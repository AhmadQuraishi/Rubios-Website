import { LoyaltyReward } from "./LoyaltyReward"

interface LoyaltyVendor {



    id: number
    // Restaurant id.
    // nullable: false

    name: string,
    // Name.
    //example: Kitchen Sink Seaport

    storename: string,
    // Store name.
    //Kitchen Sink

    streetaddress: string,
    //Street address.

    distance: number,
    // Distance from provided lat/long in miles.

    extref?: string,
    // External reference.

    supportsonlineordering: boolean,
    //Whether or not the vendor supports online ordering.

    candeliver: boolean,
    //Whether or not the vendor supports delivery.

    canpickup: boolean,
    // Whether or not the vendor supports pickup.

    supportscurbside: boolean,
    //Whether or not the vendor supports curbside pickup.

    rewards: LoyaltyReward[]
    //List of rewards at the restaurant

}
