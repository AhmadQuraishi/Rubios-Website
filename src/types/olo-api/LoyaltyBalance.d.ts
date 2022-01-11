
interface LoyaltyBalance {


    quantity: number,
    // Amount of balance.

    unit: string,
    //The unit of the balance.

    label?: string,
    // Customer-friendly description of the balance.
    // example: Reward Points

    rewardthreshold?: number
    //The accrual threshold that must be met to gain a reward.

}
