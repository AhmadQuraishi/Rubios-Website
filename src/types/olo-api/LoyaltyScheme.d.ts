import { LoyaltyMembership } from "./LoyaltyMembership";

interface LoyaltyScheme {

    id: number,
    // Olo loyalty scheme id. This id is used when adding a loyalty scheme to a basket.

    label: string,
    //Customer-friendly identifier describing the membership number field.

    name: string,
    //Name of the loyalty program.
    //example: Kitchen Sink Rewards

    provider: string,
    // Name of the loyalty provider.
    //example: Loyalty Provider

    cancheckbalance: boolean,
    //Whether or not the loyalty scheme has a checkable balance.

    membership: LoyaltyMembership

}
