
interface RequestApplyReward {

    membershipid: number,                 //format: int64 , // The user's Olo loyalty membership id. //example: 23901930912
    references: string[]
    // The loyalty provider's external identifier/code for the reward.
    //Each basket can only have a single reward.
}
