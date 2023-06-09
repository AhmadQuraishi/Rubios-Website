import { rewardTypes as Type } from '../../types/reward';
import { userTypes } from '../../types/user';


const initialState = {
    rewards: null,
    loading: false,
    error: {},
  };


  const rewardReducer = (state = initialState, action: any) => {
    switch (action.type) {
      // Case get requests
      case Type.GET_REWARDS:
        return { ...state, loading: true };

      case Type.GET_REWARDS_SUCCESS:
        return {
          ...state,
          loading: false,
          rewards: action.payload,
          error: null
        };
      case Type.GET_REWARDS_FAILURE:
        return { ...state, loading: false, error: action.error  , success: 0};
      case userTypes.USER_LOGOUT: 
        return {
          ...initialState
        }  
      default:
        return state;
    }
  };
  
  export default rewardReducer;