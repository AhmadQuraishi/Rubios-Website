import { basketActionsTypes } from '../../../types/basket';

const INITIAL_STATE = {
  loading: false,
  basket: null,
  error: {},
};

const createBasketReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.SET_BASKET_REQUEST:
      return { ...state, loading: true, basket: null, error: {} };
    case basketActionsTypes.SET_BASKET_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: {},
      };
    case basketActionsTypes.SET_BASKET_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default createBasketReducer;
