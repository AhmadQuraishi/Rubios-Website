import { basketActionsTypes } from '../../../types/basket';

const INITIAL_STATE = {
  loading: false,
  basket: null,
  error: {},
};

const dummyBasketReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.GET_DUMMY_BASKET_REQUEST:
      return { ...state, loading: true, basket: null };
    case basketActionsTypes.GET_DUMMY_BASKET_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: {},
      };
    case basketActionsTypes.GET_DUMMY_BASKET_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default dummyBasketReducer;
