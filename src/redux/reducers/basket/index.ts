import { basketActionsTypes } from '../../types/basket';
import { userTypes } from '../../types/user';

const INITIAL_STATE = {
  loading: false,
  basket: null,
  validate: null,
  calendar: {
    loading: false,
    data: null,
    error: {},
  },
  basketType: 'New',
  orderConfirmation: false,
  error: {},
};

const basketReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.GET_BASKET_REQUEST:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV:
      return {
        ...state,
        loading: true,
        basket: null,
        basketType: 'New',
        error: {},
      };
    case basketActionsTypes.VALIDETE_BASKET:
    case basketActionsTypes.SUBMIT_BASKET_SINGLE_PAYMENT:
      return {
        ...state,
        loading: true
    };
    case basketActionsTypes.GET_BASKET_SUCCESS:
    case basketActionsTypes.UPDATE_BASKET_TIME_WANTED_SUCCESS:
    case basketActionsTypes.DELETE_BASKET_TIME_WANTED_SUCCESS:
    case basketActionsTypes.UPDATE_BASKET_TIP_AMOUNT_SUCCESS:
    case basketActionsTypes.UPDATE_BASKET_COUPON_CODE_SUCCESS:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        basketType: action.basketType || 'New',
        validate: null,
        error: {},
      };
    case basketActionsTypes.GET_BASKET_FAILURE:
    case basketActionsTypes.UPDATE_BASKET_TIME_WANTED_FAILURE:
    case basketActionsTypes.DELETE_BASKET_TIME_WANTED_FAILURE:
    case basketActionsTypes.UPDATE_BASKET_TIP_AMOUNT_FAILURE:
    case basketActionsTypes.UPDATE_BASKET_COUPON_CODE_FAILURE:
    case basketActionsTypes.SUBMIT_BASKET_SINGLE_PAYMENT_FAILURE:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV_FAILURE:
    case basketActionsTypes.VALIDETE_BASKET_FAILURE:
    case basketActionsTypes.VALIDETE_BASKET_PHONE_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.error,
        validate: null,
        basketType: action.basketType || 'New',
      };
    case basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR:
      return { ...state, calendar: { loading: true, data: null, error: {} } };
    case basketActionsTypes.VALIDETE_BASKET_SUCCESS:
      return { ...state, validate: action.payload };
    case basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR_SUCCESS:
      return {
        ...state,
        loading: false,
        calendar: {
          loading: false,
          data: action.payload,
          error: {},
        },
      };
    case basketActionsTypes.GET_BASKET_FAILURE:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV_FAILURE:
      return {
        ...state,
        loading: false,
        calendar: {
          loading: false,
          error: {},
        },
        validate: null,
      };
    case basketActionsTypes.SUBMIT_BASKET_SINGLE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: null,
        validate: null,
        basketType: action.basketType || 'New',
        calendar: {
          loading: false,
          data: null,
          error: {},
        },
        orderConfirmation: true,
        error: {},
      };
    case basketActionsTypes.REMOVE_BASKET_ORDER_CONFIRMATION:
      return {
        ...state,
        orderConfirmation: false,
    };
    case userTypes.USER_LOGOUT: 
      return {
        ...INITIAL_STATE
      }   
    default:
      return state;
  }
};

export default basketReducer;
