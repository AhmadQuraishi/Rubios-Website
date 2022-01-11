import { LoyaltyBalance } from "./LoyaltyBalance"
import { LoyaltyReward } from "./LoyaltyReward"

interface LoyaltyMembership {




    id: number,
    //Olo loyalty membership id. Used when applying rewards to a basket, not when adding the loyalty scheme.

    description: string,
    //Customer-friendly description of the membership.

    membershipnumber: string,
    // The full membership number. Used when adding a loyalty scheme to a basket, not when applying loyalty rewards.

    balance: LoyaltyBalance,

    rewards: LoyaltyReward[]
    // List of loyalty rewards associated with the membership.

}
