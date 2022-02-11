import { userTypes as Type } from '../../types/user';

const initialState = {
  userProfile: null,
  userRecentOrders: null,
  loading: false,
  error: {},
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    //profile
    case Type.GET_USER_PROFILE:
      return { ...state, loading: true };

    case Type.GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, userProfile: action.payload };

    case Type.GET_USER_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.error };

    //Recent Orders

    case Type.GET_USER_RECENT_ORDERS:
      return { ...state, loading: true };

    case Type.GET_USER_RECENT_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userRecentOrders: action.payload,
      };

    case Type.GET_USER_RECENT_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default userReducer;
