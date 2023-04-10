import { basketActionsTypes } from '../../types/basket';
import { userTypes } from '../../types/user';
import { authActionsTypes } from '../../types/auth';
import moment from 'moment';

const INITIAL_STATE = {
  loading: false,
  basket: null,
  validate: null,
  calendar: {
    loading: false,
    data: null,
    error: {},
  },
  payment: {
    allowedCards: {
      loading: false,
      data: null,
      error: null,
    },
    defaultCards: {
      loading: false,
      data: null,
      error: null,
    },
    billingSchemes: [],
  },
  basketType: 'New',
  orderSubmit: false,
  error: null,
  defaultTip: true,
  duplicateAddress: [],
  signInNavigation : '',
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
        error: null,
        payment: {
          allowedCards: {
            loading: false,
            data: null,
            error: null,
          },
          defaultCards: {
            loading: false,
            data: null,
            error: null,
          },
          billingSchemes: [],
        },
        
      };
    case basketActionsTypes.VALIDETE_BASKET:
    case basketActionsTypes.SUBMIT_BASKET_SINGLE_PAYMENT:
    case basketActionsTypes.UPDATE_BASKET_TIP_AMOUNT:
    case basketActionsTypes.UPDATE_BASKET_COUPON_CODE:
    case basketActionsTypes.REMOVE_BASKET_COUPON_CODE:
    case basketActionsTypes.ADD_MULTIPLE_PRODUCT_REQUEST:
    case basketActionsTypes.UPDATE_MULTIPLE_PRODUCT_REQUEST:
    case basketActionsTypes.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case basketActionsTypes.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case basketActionsTypes.ADD_MULTIPLE_PRODUCT_SUCCESS:
    case basketActionsTypes.UPDATE_MULTIPLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload.basket,
        error: action.payload.errors,
      };
    case basketActionsTypes.GET_BASKET_SUCCESS:
    case basketActionsTypes.UPDATE_BASKET_TIME_WANTED_SUCCESS:
    case basketActionsTypes.DELETE_BASKET_TIME_WANTED_SUCCESS:
    case basketActionsTypes.UPDATE_BASKET_TIP_AMOUNT_SUCCESS:
    case basketActionsTypes.UPDATE_BASKET_COUPON_CODE_SUCCESS:
    case basketActionsTypes.REMOVE_BASKET_COUPON_CODE_SUCCESS:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV_SUCCESS:
    case basketActionsTypes.SET_BASKET_DELIVERY_MODE_SUCCESS:
    case basketActionsTypes.SET_BASKET_DELIVERY_ADDRESS_SUCCESS:
    case basketActionsTypes.REMOVE_PRODUCT_SUCCESS:
    case basketActionsTypes.ADD_PRODUCT_SUCCESS:
    case basketActionsTypes.ADD_UTENSILS_SUCCESS:
    case basketActionsTypes.REMOVE_UTENSILS_SUCCESS:
    case basketActionsTypes.ADD_UPSELLS_REQUEST_SUCCESS:
    case basketActionsTypes.UPDATE_PRODUCT_SUCCESS:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        basketType: action.basketType || 'New',
        error: null,
      };
    case basketActionsTypes.SET_TIP_FALSE:
      return {
        ...state,
        defaultTip: false,
      };
      
    case basketActionsTypes.UPDATE_DUPLICATE_ADDRESS: 
    return {
      ...state,
      duplicateAddress : action.payload,
    };
    case basketActionsTypes.NAVIGATION_URL:
      return { 
        ...state,
        signInNavigation: action.payload,
      };

    case basketActionsTypes.GET_BASKET_FAILURE:
    case basketActionsTypes.UPDATE_BASKET_TIME_WANTED_FAILURE:
    case basketActionsTypes.DELETE_BASKET_TIME_WANTED_FAILURE:
    case basketActionsTypes.UPDATE_BASKET_TIP_AMOUNT_FAILURE:
    case basketActionsTypes.UPDATE_BASKET_COUPON_CODE_FAILURE:
    case basketActionsTypes.REMOVE_BASKET_COUPON_CODE_FAILURE:
    case basketActionsTypes.SUBMIT_BASKET_SINGLE_PAYMENT_FAILURE:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV_FAILURE:
    case basketActionsTypes.VALIDETE_BASKET_FAILURE:
    case basketActionsTypes.VALIDETE_BASKET_PHONE_FAILURE:
    case basketActionsTypes.SET_BASKET_DELIVERY_MODE_FAILURE:
    case basketActionsTypes.SET_BASKET_DELIVERY_ADDRESS_FAILURE:
    case basketActionsTypes.ADD_MULTIPLE_PRODUCT_FAILURE:
    case basketActionsTypes.UPDATE_MULTIPLE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        validate: null,
        basketType: action.basketType || 'New',
        orderSubmit: false,
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
          error: null,
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
    case basketActionsTypes.RESET_BASKET_REQUEST:
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
        payment: {
          allowedCards: {
            loading: false,
            data: null,
            error: null,
          },
          defaultCards: {
            loading: false,
            data: null,
            error: null,
          },
          billingSchemes: [],
        },
        orderSubmit: false,
        error: null,
      };
    case basketActionsTypes.ADD_BASKET_ORDER_SUBMIT:
      return {
        ...state,
        orderSubmit: true,
      };
    case basketActionsTypes.REMOVE_BASKET_ORDER_SUBMIT:
      return {
        ...state,
        orderSubmit: false,
      };
    case basketActionsTypes.GET_BASKET_ALLOWED_CARDS_REQUEST:
      return {
        ...state,
        payment: {
          ...state.payment,
          allowedCards: {
            loading: false,
          },
        },
      };
    case basketActionsTypes.GET_BASKET_ALLOWED_CARDS_REQUEST_SUCCESS:
      return {
        ...state,
        payment: {
          ...state.payment,
          allowedCards: {
            loading: false,
            data: action.payload,
            error: null,
          },
        },
      };
    case basketActionsTypes.GET_BASKET_ALLOWED_CARDS_REQUEST_FAILURE:
      return {
        ...state,
        payment: {
          ...state.payment,
          allowedCards: {
            loading: false,
            error: action.error,
          },
        },
      };
    case basketActionsTypes.UPDATE_BASKET_BILLING_SCHEMES:
      return {
        ...state,
        payment: {
          ...state.payment,
          billingSchemes: action.payload,
        },
      };
    case basketActionsTypes.RESET_BASKET_PAYMENT_METHODS:
      return {
        ...state,
        payment: {
          allowedCards: {
            loading: false,
            data: null,
            error: null,
          },
          defaultCards: {
            loading: false,
            data: null,
            error: null,
          },
          billingSchemes: [],
        },
      };
    case userTypes.USER_LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default basketReducer;
