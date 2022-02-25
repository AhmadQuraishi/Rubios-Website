import { rewardTypes as Type } from '../../types/reward';

const initialState = {
    userRedeemRewards: null,
    loading: false,
    error: {},
    success: 0
  };


  const rewardReducer = (state = initialState, action: any) => {
    switch (action.type) {
      // Case get requests
      case Type.GET_REDEEM_REWARDS:
        return { ...state, loading: true };

      case Type.GET_REDEEM_REWARDS_SUCCESS:
        return {
          ...state,
          loading: false,
          userRedeemRewards: action.payload,
          error: null
        };
      case Type.GET_REDEEM_REWARDS_FAILURE:
        return { ...state, loading: false, error: action.error  , success: 0};
  
      default:
        return state;
    }
  };
  
  export default rewardReducer;