import { rewardTypes as Type } from '../../types/reward';
import { userTypes } from '../../types/user';

const initialState = {
  data: null,
  loading: false,
  error: {},
};

const rewardNewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.GET_REWARDS_NEW:
      return { ...state, data: null, error: {}, loading: true };

    case Type.GET_REWARDS_NEW_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case Type.GET_REWARDS_FAILURE:
      return { ...state, data: null, loading: false, error: action.error };
    case userTypes.USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default rewardNewReducer;
