import { Restaurant } from '@mui/icons-material';
import { restaurantActionsTypes } from '../../types/restaurant';
import { userTypes } from '../../types/user';
import moment from 'moment';
const INITIAL_STATE = {
  loading: false,
  restaurant: null,
  orderType: '',
  error: {},
  sessionTime: null,
  promotionMsg: true,
};

const restaurantInfoReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case restaurantActionsTypes.GET_RESTAURANT_INFO_REQUEST:
      return { ...state, loading: true, restaurant: null, error: {} };
    case restaurantActionsTypes.GET_RESTAURANT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
        error: {},
        sessionTime: moment().unix(),
        promotionMsg: true,

      };
      case restaurantActionsTypes.SET_PROMOTIONAL_MSG: 
      return {
        ...state,
        promotionMsg: false,
      }
    case restaurantActionsTypes.GET_RESTAURANT_INFO_FAILURE: 
      return { ...state, loading: false, error: action.error };
    case restaurantActionsTypes.SET_RESTAURANT_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        restaurant: null,
        orderType: '',
        error: {},
        promotionMsg: true,
      };

       
    case restaurantActionsTypes.SET_RESTAURANT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
        orderType: action.orderType,
        error: {},
        sessionTime: moment().unix(),
        promotionMsg: true,
      };

    case restaurantActionsTypes.SET_RESTAURANT_SESSION_REQUEST:
      return {
        ...state,
        sessionTime: moment().unix(),
      };
      case restaurantActionsTypes.SET_SESSION_REQUEST:
      return {
        ...state,
        sessionTime: null,
      };
    case restaurantActionsTypes.SET_RESTAURANT_INFO_FAILURE:
      return { ...state, loading: false, error: action.error };
    case restaurantActionsTypes.SET_RESTAURANT_INFO_ORDER_TYPE:
      return { ...state, orderType: action.orderType };
    case restaurantActionsTypes.RESTAURANT_RESET_REQUEST:    
    case userTypes.USER_LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default restaurantInfoReducer;
