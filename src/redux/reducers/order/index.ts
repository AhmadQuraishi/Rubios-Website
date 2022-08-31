import { orderActionTypes } from '../../types/order';

const INITIAL_STATE = {
  order: {
    loading: false,
    data: null,
    error: null,
  },
  restaurant: {
    loading: false,
    data: null,
    error: null,
  },
};

const orderReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case orderActionTypes.GET_SINGLE_ORDER_REQUEST:
      return {
        ...state,
        order: {
          loading: true,
          data: null,
          error: null,
        },
        restaurant: {
          loading: false,
          data: null,
          error: null,
        },
      };
    case orderActionTypes.GET_SINGLE_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        order: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case orderActionTypes.GET_SINGLE_ORDER_REQUEST_FAILURE:
      return {
        ...state,
        order: {
          loading: false,
          error: action.error,
          data: null,
        },
        restaurant: {
          loading: false,
          data: null,
          error: null,
        },
      };
    case orderActionTypes.GET_ORDER_RESTAURANT_REQUEST:
      return {
        ...state,
        restaurant: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case orderActionTypes.GET_ORDER_RESTAURANT_REQUEST_SUCCESS:
      return {
        ...state,
        restaurant: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case orderActionTypes.GET_ORDER_RESTAURANT_REQUEST_FAILURE:
      return {
        ...state,
        restaurant: {
          loading: false,
          error: action.error,
          data: null,
        },
      };
    default:
      return state;
  }
};

export default orderReducer;
