import { basketActionsTypes } from '../../types/basket';

const INITIAL_STATE = {
  loading: false,
  basket: null,
  calendar: {
    loading: false,
    data: null,
    error: {}
  },
  error: {}
};

const basketReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.GET_BASKET_REQUEST:
      return { ...state, loading: true, basket: null };
    case basketActionsTypes.GET_BASKET_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: {},
      };
    case basketActionsTypes.GET_BASKET_FAILURE:
      return { ...state, loading: false, error: action.error };
    case basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR:
      return { ...state, calendar: {loading: true, data: null, error: {}}};
    case basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR_SUCCESS:
      return {
          ...state,
          calendar: {
            loading: false, 
            data: action.payload, 
            error: {}
          }
        };
    case basketActionsTypes.GET_BASKET_FAILURE:
      return { 
        ...state, 
        calendar: {
          loading: false, 
          error: {}
        }
      };
    default:
      return state;
  }
};

export default basketReducer;
