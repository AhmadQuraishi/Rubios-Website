import { rewardTypes as Type } from '../../../../types/reward';
import { userTypes } from '../../../../types/user';

const initialState = {
  basket: null,
  loading: false,
  error: null,
};

const removeRewardFromBasketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Case get requests
    case Type.DELETE_REWARD_FROM_BASKET_REQUEST:
      return { ...state, loading: true, basket: null, error: null};

    case Type.DELETE_REWARD_FROM_BASKET_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: null,
      };
    case Type.DELETE_REWARD_FROM_BASKET_REQUEST_FAILURE:
      return { ...state, loading: false, error: action.error, basket: null };
    case userTypes.USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default removeRewardFromBasketReducer;
