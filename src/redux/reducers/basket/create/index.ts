import { basketActionsTypes } from '../../../types/basket';
import { userTypes } from '../../../types/user';

const INITIAL_STATE = {
  loading: false,
  basket: null,
  error: null,
};

const createBasketReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.SET_BASKET_REQUEST:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV_ORDER_REQUEST:
    case basketActionsTypes.CREATE_BASKET_FROM_FAV_ORDER_REQUEST:
      return { ...state, loading: true, basket: null, error: null };

    case basketActionsTypes.SET_BASKET_SUCCESS:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV_ORDER_SUCCESS:
    case basketActionsTypes.CREATE_BASKET_FROM_FAV_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: null,
      };
    case basketActionsTypes.SET_BASKET_FAILURE:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV_ORDER_FAILURE:
    case basketActionsTypes.CREATE_BASKET_FROM_FAV_ORDER_FAILURE:
      return { ...state, loading: false, error: action.error };
    case userTypes.USER_LOGOUT: 
      return { ...INITIAL_STATE }  
    default:
      return state;
  }
};

export default createBasketReducer;
