import { redemptionTypes as Type } from '../../types/reward/redemption';
import { userTypes } from '../../types/user';

const initialState = {
  redemption: null,
  reward_name: '',
  loading1: true,
  error: null,
};

const redemptionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.GET_REWARD_REDEMPTION_CODE:
    case Type.GET_REDEEMABLE_REDEMPTION_CODE:
      return { ...state, error: null, redemption: null, loading1: true };
    case Type.GET_REWARD_REDEMPTION_CODE_SUCCESS:
    case Type.GET_REDEEMABLE_REDEMPTION_CODE_SUCCESS:
      return {
        ...state,
        redemption: action.payload,
        error: null,
        loading1: false,
      };
    case Type.SET_REWARD:
      return {
        ...state,
        reward_name: action.payload,
      };
    case Type.GET_REWARD_REDEMPTION_CODE_FAILURE:
    case Type.GET_REDEEMABLE_REDEMPTION_CODE_FAILURE:
      return {
        ...state,
        error: action.error,
        redemption: null,
        loading1: false,
      };
    case userTypes.USER_LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default redemptionReducer;
