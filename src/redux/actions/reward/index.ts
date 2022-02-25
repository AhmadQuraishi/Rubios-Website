import { rewardTypes as Type } from '../../types/reward';
import { ResponseLoyaltyRewards } from '../../../types/olo-api';


export function getRedeemRewards() {
    return {
      type: Type.GET_REDEEM_REWARDS,
    };
  }
  
  export function getRedeemRewardsSuccess(data: ResponseLoyaltyRewards) {
    return {
      type: Type.GET_REDEEM_REWARDS_SUCCESS,
      payload: data,
    };
  }
  
  export function getRedeemRewardsFailure(error: any) {
    return {
      type: Type.GET_REDEEM_REWARDS_FAILURE,
      error: error,
    };
  }
  