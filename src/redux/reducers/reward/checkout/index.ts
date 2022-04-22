import { rewardTypes as Type } from '../../../types/reward';
import { userTypes } from '../../../types/user';

const initialState = {
  rewards: null,
  loading: false,
  error: null,
};

const getRewardForCheckoutReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Case get requests
    case Type.GET_USER_REWARDS_FOR_CHECKOUT_REQUEST:
      return { ...state, loading: true, error: null, rewards: null };

    case Type.GET_USER_REWARDS_FOR_CHECKOUT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        rewards: action.payload,
        error: null,
      };
    case Type.GET_USER_REWARDS_FOR_CHECKOUT_REQUEST_FAILURE:
      return { ...state, loading: false, error: action.error, success: 0 };
    case userTypes.USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default getRewardForCheckoutReducer;
