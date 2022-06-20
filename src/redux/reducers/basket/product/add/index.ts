import { basketActionsTypes } from '../../../../types/basket';

const INITIAL_STATE = {
  loading: false,
  basket: null,
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
  error: {},
  action: null
};

const addProductReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.ADD_PRODUCT_REQUEST:
      return { ...state, loading: true, basket: null, error: {}, action: null };
    case basketActionsTypes.ADD_UPSELLS_REQUEST_RESET:
      return { ...state, action: null };
    case basketActionsTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        basket: action.payload,
        error: {},
      };
    case basketActionsTypes.ADD_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.error, action: 'FAILURE' };
    default:
      return state;
  }
};

export default addProductReducer;
