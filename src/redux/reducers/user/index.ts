import { userTypes as Type } from '../../types/user';

const initialState = {
  userProfile: null,
  userRecentOrders: null,
  userFavoriteOrders: null,
  userDeliveryAddresses: null,
  userDefaultDeliveryAddress: null,
  loading: false,
  error: {},
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Case get requests
    case Type.GET_USER_PROFILE:
    case Type.GET_USER_RECENT_ORDERS:
    case Type.GET_USER_FAVORITE_ORDERS:
    case Type.GET_USER_DELIVERY_ADDRESSES:
    case Type.DELETE_USER_DELIVERY_ADDRESS:
    case Type.DEL_USER_DEL_ADD_SUCCESS:
      return { ...state, loading: true };

    //Success cases
    case Type.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
      };
    case Type.GET_USER_RECENT_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userRecentOrders: action.payload,
      };
    case Type.GET_USER_FAVORITE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userFavoriteOrders: action.payload,
      };
    case Type.GET_USER_DELIVERY_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        userDeliveryAddresses: action.payload,
      };
    case Type.SET_USER_DEF_DEL_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        userDefaultDeliveryAddress: action.payload,
      };

    // error cases
    case Type.GET_USER_RECENT_ORDERS_FAILURE:
    case Type.GET_USER_FAVORITE_ORDERS_FAILURE:
    case Type.GET_USER_PROFILE_FAILURE:
    case Type.GET_USER_DELIVERY_ADDRESSES_FAILURE:
    case Type.SET_USER_DEFAULT_DEL_ADD_FAILURE:
    case Type.DEL_USER_DEL_ADD_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default userReducer;
