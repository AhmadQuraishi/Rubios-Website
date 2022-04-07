import { displayToast } from '../../../../helpers/toast';
import { rewardTypes as Type } from '../../../types/reward';

export function getRewardsForCheckoutRequest(vendorID: any, authToken: any ) {
  return {
    type: Type.GET_USER_REWARDS_FOR_CHECKOUT_REQUEST,
    vendorID,
    authToken
  };
}

export function getRewardsForCheckoutRequestSuccess(data: any) {
  return {
    type: Type.GET_USER_REWARDS_FOR_CHECKOUT_REQUEST_SUCCESS,
    payload: data && data.rewards && data.rewards,
  };
}

export function getRewardsForCheckoutRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: Type.GET_USER_REWARDS_FOR_CHECKOUT_REQUEST_FAILURE,
    error: error,
  };
}
