import { rewardTypes as Type } from '../../types/reward';
import { ResponseLoyaltyRewards } from '../../../types/olo-api';


export function getRewards() {
    return {
      type: Type.GET_REWARDS,
    };
  }
  
  export function getRewardsSuccess(data: ResponseLoyaltyRewards) {
    return {
      type: Type.GET_REWARDS_SUCCESS,
      payload: data,
    };
  }
  
  export function getRewardsFailure(error: any) {
    return {
      type: Type.GET_REWARDS_FAILURE,
      error: error,
    };
  }
  