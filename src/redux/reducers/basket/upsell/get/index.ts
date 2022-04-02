import { basketActionsTypes } from '../../../../types/basket';

const INITIAL_STATE = {
  loading: false,
  upsells: null,
  error: {},
};

const getUpsellsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.GET_UPSELLS_REQUEST:
    case basketActionsTypes.SET_BASKET_REQUEST:
    case basketActionsTypes.CREATE_BASKET_FROM_PREV:
    case basketActionsTypes.CREATE_BASKET_FROM_FAV_ORDER_REQUEST:
    case basketActionsTypes.SUBMIT_BASKET_SINGLE_PAYMENT_SUCCESS:
      return { ...state, loading: true, upsells: null, error: {} };
    case basketActionsTypes.GET_UPSELLS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        upsells: action.payload,
        error: {},
      };
    case basketActionsTypes.GET_UPSELLS_REQUEST_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default getUpsellsReducer;
