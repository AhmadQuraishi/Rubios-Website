import { displayToast } from "../../../../helpers/toast";
import { redemptionTypes as Type } from "../../../types/reward/redemption";

export function getRedemptionCode(reward_id: string) {
  return {
    type: Type.GET_CODE,
    payload: reward_id
  };
}

export function getRedemptionCodeSuccess(data: any) {

  return {
    type: Type.GET_CODE_SUCCESS,
    payload: data,
  };

}

export function getRedemptionCodeFailure(error: any) {
  displayToast('ERROR', error?.data?.error ? error.data.error : 'Failed to redeem this reward');
  return {
    type: Type.GET_CODE_FAILURE,
    error: error,
  };
}
export function setReward(reward_name: string) {
  return {
    type: Type.SET_REWARD,
    payload: reward_name
  };
}


