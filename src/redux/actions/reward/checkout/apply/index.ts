import { displayToast } from '../../../../../helpers/toast';
import { rewardTypes as Type } from '../../../../types/reward';

export function applyRewardOnBasketRequest(
  basketID: number,
  body: RequestApplyReward,
) {
  return {
    type: Type.APPLY_REWARD_TO_BASKET_REQUEST,
    basketID,
    body,
  };
}

export function applyRewardOnBasketRequestSuccess(data: any) {
  return {
    type: Type.APPLY_REWARD_TO_BASKET_REQUEST_SUCCESS,
    payload: data,
  };
}

export function applyRewardOnBasketRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: Type.APPLY_REWARD_TO_BASKET_REQUEST_FAILURE,
    error: error,
  };
}
