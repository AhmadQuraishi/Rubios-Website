import { displayToast } from '../../../../../helpers/toast';
import { rewardTypes as Type } from '../../../../types/reward';

export function removeRewardFromBasketRequest(
  basketID: number,
  rewardID: number,
) {
  return {
    type: Type.DELETE_REWARD_FROM_BASKET_REQUEST,
    basketID,
    rewardID,
  };
}

export function removeRewardFromBasketRequestSuccess(data: any) {
  return {
    type: Type.DELETE_REWARD_FROM_BASKET_REQUEST_SUCCESS,
    payload: data,
  };
}

export function removeRewardFromBasketRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: Type.DELETE_REWARD_FROM_BASKET_REQUEST_FAILURE,
    error: error,
  };
}
