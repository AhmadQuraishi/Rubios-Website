import { rewardTypes as Type } from '../../../../types/reward';
import { userTypes } from '../../../../types/user';

const initialState = {
  basket: null,
  loading: false,
  error: null,
};

const applyRewardOnBasketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Case get requests
    case Type.APPLY_REWARD_TO_BASKET_REQUEST:
      return { ...state, loading: true, basket: null, error: null };

    case Type.APPLY_REWARD_TO_BASKET_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: null,
      };
    case Type.APPLY_REWARD_TO_BASKET_REQUEST_FAILURE:
      return { ...state, loading: false, error: action.error };
    case userTypes.USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default applyRewardOnBasketReducer;
