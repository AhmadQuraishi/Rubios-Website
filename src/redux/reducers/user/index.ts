import { type } from 'os';
import { userTypes as Type } from '../../types/user';

const initialState = {
  userProfile: null,
  userRecentOrders: null,
  userFavoriteOrders: null,
  userDeliveryAddresses: null,
  userDefaultDeliveryAddress: null,
  userBillingAccounts: null,
  userBillingAccountById: null,
  userGiftCards: null,
  updatedUserprofile: {
    data: null,
    passerror: {},
    passsuccess : 0
  },
  loading: false,
  error: {},
  success: 0
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Case get requests
    case Type.GET_USER_RECENT_ORDERS:
    case Type.GET_USER_FAVORITE_ORDERS:
    case Type.GET_USER_PROFILE:
    case Type.GET_USER_DELIVERY_ADDRESSES:
    case Type.GET_USER_PROFILE:
    case Type.CHANGE_PASSWORD:
    case Type.UPDATE_USER:
    case Type.GET_BILLING_ACCOUNTS:
    case Type.GET_BILLING_ACCOUNT_BY_ID:
    case Type.GET_GIFT_CARDS:
      return { ...state, loading: true };

    //Success cases
    case Type.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedUserprofile: { data : action.payload , error : null , passsuccess : 1},
        error: null,
        
        
      };
    case Type.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        error: null
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
        userFavoriteOrders: action.payload,
        loading: false,
      };
    case Type.GET_USER_DELIVERY_ADDRESSES_SUCCESS:
      return {
        ...state,
        userDeliveryAddresses: action.payload,
        loading: false,
      };
    case Type.SET_USER_DEF_DEL_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        userDefaultDeliveryAddress: action.payload,
      };
    case Type.DEL_USER_DEL_ADD_SUCCESS:
    case Type.DEL_FAV_ORDER_SUCCESS:
      return {
        ...state,
      };
    case Type.UPDATE_USER_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
        error: null,
        success : 1
        
      };
    case Type.GET_BILLING_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userBillingAccounts: action.payload,
      };
    case Type.GET_BILLING_ACCOUNT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        userBillingAccountById: action.payload,
      };
    case Type.DELETE_BILLING_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
      }; 
    case Type.UPDATE_BILLING_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userBillingAccounts: action.payload,
      };
    case Type.GET_GIFT_CARDS_SUCCESS:
        return {
          ...state,
          loading: false,
          userGiftCards: action.payload,
        };

    // error cases
    case Type.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        updatedUserprofile: { ...state.updatedUserprofile, passerror: action.payload , passsuccess : 0 },
 };
    case Type.GET_USER_RECENT_ORDERS_FAILURE:
    case Type.GET_USER_FAVORITE_ORDERS_FAILURE:
    case Type.GET_USER_PROFILE_FAILURE:
    case Type.GET_USER_DELIVERY_ADDRESSES_FAILURE:
    case Type.SET_USER_DEFAULT_DEL_ADD_FAILURE:
    case Type.DEL_USER_DEL_ADD_FAILURE:
    case Type.UPDATE_USER_FAILURE:
    case Type.CHANGE_PASSWORD_FAILURE:
    case Type.GET_BILLING_ACCOUNTS_FAILURE:
    case Type.GET_BILLING_ACCOUNT_BY_ID_FAILURE:
    case Type.DELETE_BILLING_ACCOUNTS_FAILURE:
    case Type.UPDATE_BILLING_ACCOUNTS_FAILURE:
    case Type.GET_GIFT_CARDS_FAILURE:
    case Type.DEL_FAV_ORDER__FAILURE:
      return { ...state, loading: false, error: action.error  , success: 0};

    default:
      return state;
  }
};

export default userReducer;
