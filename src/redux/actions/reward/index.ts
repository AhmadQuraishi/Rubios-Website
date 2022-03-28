import { rewardTypes as Type } from '../../types/reward';
import { ResponseLoyaltyRewards } from '../../../types/olo-api';


export function getRewards() {
    return {
      type: Type.GET_REWARDS,
    };
  }
  
  export function getRewardsSuccess(data: any) {
    return {
      type: Type.GET_REWARDS_SUCCESS,
      payload: data &&  data.rewards && data.rewards,
    };
  }
  
  export function getRewardsFailure(error: any) {
    return {
      type: Type.GET_REWARDS_FAILURE,
      error: error,
    };
  }
  