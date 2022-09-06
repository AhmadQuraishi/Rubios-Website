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
  let msg = '';
  if (error?.response?.data?.message) {
    if (
      error.response.data.message ===
      'Loyalty reward may not be applied since a coupon code is already applied to your basket. Remove the coupon code to proceed.'
    ) {
      msg = 'Only one reward or coupon can be applied to an order.';
    } else {
      msg = error.response.data.message;
    }
  } else {
    msg = 'ERROR! Please Try again later';
  }
  displayToast('ERROR', msg);
  return {
    type: Type.APPLY_REWARD_TO_BASKET_REQUEST_FAILURE,
    error: error,
  };
}

export function applyRewardOnBasketFailureStopLoader() {
  return {
    type: Type.APPLY_REWARD_TO_BASKET_REQUEST_FAILURE_STOP_LOADER,
  };
}
